const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Juan Perez",
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Desarrollador",
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {
        return /^(http|https):\/{2}[._~:\/?%#\]@!$&'()*+,;=A-Za-z0-9\-]+/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid http address`,
    },
    default: "https://randomuser.me/api/portraits/lego/1.jpg",
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {
        return /^((?!\.)[\w\-_.]*[^.])(@[\w-]+)(\.[\w-]+(\.[\w-]+)?[^.\W])$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false
    /*
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value} is not a valid password; password must contain 1 number (0-9), password must contain 1 uppercase letters, password must contain 1 lowercase letters, password must contain 1 non-alpha numeric number,password is 8-16 characters with no space`,
    },
    */
  },
});

module.exports = mongoose.model("user", UserSchema);
