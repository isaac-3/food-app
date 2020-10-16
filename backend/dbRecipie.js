import mongoose from 'mongoose'
const {ObjectId} = mongoose.Schema.Types

import Users from './dbUser.js'

const recipieSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    mealName: {
        type: String,
        required: true
    },
    catName: {
        type: String,
        required: true,
    },
    instructions:{
        type: String,
        required: true,
    },
    ingredients:{
        type: Object,
        required: true
    },
    creater:{
        type: ObjectId,
        ref: 'users'
    }
})

recipieSchema.pre('remove', async function(next, req){
    try {
        await Users.findOneAndUpdate({}, {
            $pull:{recipies: {id: req.params.recID},likes: req.params.recID}
        },{
            new: true
        })
        next()
    } catch (error) {
        next(error)
    }
})

export default mongoose.model('recipies', recipieSchema)