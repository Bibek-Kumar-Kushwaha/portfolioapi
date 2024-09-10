import mongoose from 'mongoose'

const projectUploderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    altMessage: {
        type: String,
        required: true,
        trim: true,
    },
    link: {
        type: String,
        required: true,
        trim: true,
    },
    projectImage: {
        imageUrl: {
            type: String,
        },
        public_id: {
            type: String,
        }
    }
})

const projectUploder = mongoose.model('Project', projectUploderSchema);
export default projectUploder;