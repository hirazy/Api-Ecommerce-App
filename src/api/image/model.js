import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true })

imageSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        }

        return full ? {
            ...view
            // add properties for a full view
        } : view
    }
}

const model = mongoose.model('Image', imageSchema)

export const schema = model.schema
export default model