const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Field username is required to fill'],
    unique: true,
    validate: {
      validator: async (value) => {
        const user = await User.findOne({ username: value });
        if (user) return false;
      },
      message: (props) => `User " ${props.value} " already exists`,
    },
  },
  email: {
    type: String,
    required: [true, "Field email is required to fill"],
    unique: true,
    validate: {
      validator: async (value) => {
        const user = await User.findOne({email: value});
        if (user) return false;
      },
      message: (props) => `Email ${props.value} already exists`
    }
  },
  password: {
    type: String,
    required: [true, 'Field password is required to fill'],
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  facebookId: String,
  displayName: {
    type: String,
    required: true
  },
  avatarImage: String
});

UserSchema.path("email").validate(value => {
  return /^[\w-.]+@(\b[a-z-]+\b)[^-].[a-z]{2,10}$/g.test(value);
}, "Enter correct email address");

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);
module.exports = User;