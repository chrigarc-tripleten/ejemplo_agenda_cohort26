const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Juan Perez'
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Desarrollador'
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: function (v) {        
        return /^(http|https):\/{2}[._~:\/?%#\]@!$&'()*+,;=A-Za-z0-9\-]+/.test(v);
      },
      message: (props) => `${props.value} is not a valid http address`,
    },
    default: 'https://randomuser.me/api/portraits/lego/1.jpg'
  },
});

module.exports = mongoose.model('user', UserSchema);