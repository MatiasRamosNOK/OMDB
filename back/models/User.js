const S = require("sequelize");
const db = require("./db/index");
const crypto = require("crypto");
class User extends S.Model {}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

User.addHook("beforeCreate", function (user) {
  user.salt = generateSalt();
  user.password = user.setPassword(user.password);
});

User.prototype.setPassword = function (pass) {
  return crypto.createHmac("sha1", this.salt).update(pass).digest("hex");
};

User.prototype.validPassword = function (password) {
  return this.password === this.setPassword(password);
};
function generateSalt() {
  return crypto.randomBytes(20).toString("hex");
}

module.exports = User;
