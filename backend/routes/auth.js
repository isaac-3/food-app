import express from 'express'
const router = express.Router()

import Users from '../dbUser.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jcnfcrecetiejcne'

router.post('/signup', (req, res) => {
    const {name, email, password} = req.body
    if( !email || !password || !name){
        return res.status(422).json({error: 'Pls add all the fields'})
    }
    Users.findOne({email: email})
    .then((savedUser)=>{
        if(savedUser){
            return res.json({error: 'User already exisit with that email'})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new Users({
                email,
                password: hashedpassword,
                name,
            })
            user.save()
            .then(user=>{
                const token = jwt.sign({_id: user._id}, JWT_SECRET)
                res.json({_id: user._id, name: user.name, email: user.email, recipies: user.recipies, token})
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if(!email || !password){
        return res.status(422).json({error: 'pls add email or password!'})
    }
    Users.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: 'invalid email or pssword'})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                const {_id, name, email, recipies} = savedUser
                res.json({user: {_id, name, email, recipies, token}})
            }else{
                return res.status(422).json({error: 'invalid email or pssword'})
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
})

export default router