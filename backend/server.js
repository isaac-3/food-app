import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import auth from './routes/auth.js'
import opts from './routes/userOpts.js'

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

mongoose.set('useFindAndModify', false); // for findoneandupdate

app.use(auth)
app.use(opts)


app.listen(port,() => console.log(`listening on port${port}`))