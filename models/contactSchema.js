import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String},
    message: { type: String},
});

const contactData = mongoose.model('contactData', userSchema);

export default contactData;
