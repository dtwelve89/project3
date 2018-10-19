const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

//generates hash Salt of password for encryption
UserSchema.methods.generateHash = function(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

//validates password
UserSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
