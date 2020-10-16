import express from 'express'
const router = express.Router()

import Users from '../dbUser.js'

import requireLogin from '../middleware/requireLogin.js'

router.patch('/addRec', requireLogin, (req, res) => {
    Users.findByIdAndUpdate(req.user._id, {
        $push:{recipies: req.body.recipie}
    },{
        new: true
    })
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(result)
        }
    })
})

router.patch('/removeRec', requireLogin, (req, res) => {
    Users.find(req.user._id, {
        $pull:{recipies: {id: req.body.mealId}}
    },{
        new: true
    })
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(result)
        }
    })
})
router.patch('/addLike', requireLogin, (req, res) => {
    Users.findByIdAndUpdate(req.user._id, {
        $push:{likes: req.body.id}
    },{
        new: true
    })
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(result)
        }
    })
})

router.patch('/removeLike', requireLogin, (req, res) => {
    Users.findByIdAndUpdate(req.user._id, {
        $pull:{likes: req.body.mealId}
    },{
        new: true
    })
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }else{
            res.json(result)
        }
    })
})


export default router