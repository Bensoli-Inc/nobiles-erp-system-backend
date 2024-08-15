
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true, },
  institutionName: {type: String, required: true, },
  role: {type: String, enum: ['founder', 'admin', 'staff'], required: true},
  isActive: {type: Boolean, default: true}
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
