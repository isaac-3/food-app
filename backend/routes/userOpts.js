import express from 'express'
const router = express.Router()

import Users from '../dbUser.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import requireLogin from '../middleware/requireLogin.js'

const JWT_SECRET = 'jcnfcrecetiejcne'

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


export default router