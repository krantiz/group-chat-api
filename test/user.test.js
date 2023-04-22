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
