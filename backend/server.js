import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'

//dbs
import Users from './dbUser.js'

const app = express()
const port = process.env.PORT || 9000

app.use(express.json())
app.use(cors())

const dbUrl = 'mongodb+srv://admin:x4dKRTzKafMnaNJ8@cluster0.rfqsv.mongodb.net/food-app?retryWrites=true&w=majority'
mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected')
})

app.get('/',(req, res) => {
    res.status(200).send("hello world")
})

app.post('/signup', (req, res) => {
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
                console.log(user)
                res.json({message: 'saved seccusfullt'})
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

app.listen(port,() => console.log(`listening on port${port}`))