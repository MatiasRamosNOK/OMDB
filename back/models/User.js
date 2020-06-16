const S = require("sequelize");
const db = require("./db/index");
const crypto = require("crypto");
class User extends S.Model {}

User.init(
  {
    sessionID: {
      type: S.STRING,
    },
    moviesID: {
      type: S.STRING,
      defaultValue: "",
      get() {
        var array = this.getDataValue("moviesID");
        return array.split(",");
      },
      set: function (value) {
        if (this.getDataValue("moviesID").includes(value)) {
          //Si el valor ya existe lo elimino
          this.setDataValue(
            "moviesID",
            this.getDataValue("moviesID").replace(`,${value}`, "")
          );
        } else {
          //Sino lo seteo
          this.setDataValue(
            "moviesID",
            this.getDataValue("moviesID") + "," + value
          );
        }
      },
    },
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
