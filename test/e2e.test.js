const request = require("supertest");
const app = require("../index");

describe("POST /api/user/login", () => {
  test("should return a JWT token on successful login", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({
        email: "admin@example.com",
        password: "admin123",
      })
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("should return 401 unauthorized for invalid login", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({
        email: "invalid@example.com",
        password: "password",
      })
      .expect(401);

    expect(res.body).toEqual({ message: "Invalid email or password" });
  });
});

let authToken; // token to be used for authenticated routes

describe("User APIs", () => {
  // Login as admin and get auth token
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/user/login")
      .send({ email: "admin@example.com", password: "admin123" });

    authToken = loginResponse.body.token;
  });

  describe("Create User API", () => {
    it("should create a new user", async () => {
      const userData = {
        email: "newuser@example.com",
        name: "New User",
        password: "newuserpassword",
        isAdmin: false,
      };

      const response = await request(app)
        .post("/api/admin/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(userData.email);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.isAdmin).toBe(userData.isAdmin);
    });
  });

  describe("Update User API", () => {
    let userId; // ID of the user to be updated

    // Create a new user to update
    beforeAll(async () => {
      const userData = {
        email: "userToUpdate@example.com",
        name: "User To Update",
        password: "usertoupdatepassword",
        isAdmin: false,
      };

      const response = await request(app)
        .post("/api/admin/users")
        .set("Authorization", `Bearer ${authToken}`)
        .send(userData);

      userId = response.body.id;
    });

    it("should update an existing user", async () => {
      const updatedUserData = {
        email: "updatedUser@example.com",
        name: "Updated User",
        password: "updateduserpassword",
        isAdmin: true,
      };

      const response = await request(app)
        .put(`/api/admin/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedUserData);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe(updatedUserData.email);
      expect(response.body.name).toBe(updatedUserData.name);
      expect(response.body.isAdmin).toBe(updatedUserData.isAdmin);
    });
  });
});

describe("Group API", () => {
  let token = "";
  let groupId = "";
  let messageId = "";

  beforeAll(async () => {
    const loginRes = await request(app).post("/api/user/login").send({
      email: "normaluser@example.com",
      password: "admin123",
    });

    token = loginRes.body.token;
  });

  it("should create a group", async () => {
    const res = await request(app)
      .post("/api/groups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "My Group2",
        description: "This is a test group",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    groupId = res.body.id;
  });

  it("should search for groups", async () => {
    const res = await request(app)
      .get("/api/groups?q=Group")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should add members to a group", async () => {
    const res = await request(app)
      .post(`/api/groups/${groupId}/members`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userIds: [1, 3],
      });

    expect(res.statusCode).toEqual(201);
  });

  it("should send a message in a group", async () => {
    const res = await request(app)
      .post(`/api/groups/${groupId}/messages`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content: "Hello worldfafashfsdhfahdsf",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    messageId = res.body.id;
  });

  it("should like a message", async () => {
    const res = await request(app)
      .post(`/api/messages/${messageId}/like`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
  });

  it("should delete a group", async () => {
    const res = await request(app)
      .delete(`/api/groups/${groupId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
  });
});
