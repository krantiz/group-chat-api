module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
  });

  const Group = sequelize.define("group", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
  });

  const Message = sequelize.define("message", {
    content: DataTypes.STRING,
    likes: {type: DataTypes.INTEGER, defaultValue: 0},
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
  });

  // Define associations
  User.belongsToMany(Group, { through: 'userGroup' });
  Group.belongsToMany(User, { through: 'userGroup' });

  Message.belongsTo(User);
  Message.belongsTo(Group);

  return { User, Group, Message };
};
