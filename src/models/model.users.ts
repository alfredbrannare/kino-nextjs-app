import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
  hashedPassword: String,
  role: {
    type: String,
    enum: [
      'user',
      'admin',
      'user silver',
      'user guld',
      'user kinoguru',
      'admin silver',
      'admin guld',
      'admin kinoguru',
    ],
    default: 'user',
  },
  points: {
    type: Number,
    default: 50,
  },
  benefits: {
    type: [String],
    default: ['2 små läsk för priset av en!'],
  },
  profilePicture: {
    type: String,
    default: '',
  },
});

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

export default User;
