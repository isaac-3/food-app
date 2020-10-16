import express from 'express'
const router = express.Router()

import Recipies from '../dbRecipie.js'

import requireLogin from '../middleware/requireLogin.js'

router.post('/createRec', requireLogin, (req, res) => {
    const { imageUrl, mealName, catName, instructions, fields} = req.body
    const ings = {}
    for(let i = 0; i < fields.length; i++){
        ings[fields[i].mn] = fields[i].ma
    }
    if(!imageUrl || !mealName || !catName || !instructions){
        res.status(422).json({error: 'pls add all the fields'})
    }
    const newRec = new Recipies({
        imageUrl,
        mealName,
        catName,
        instructions,
        ingredients: ings,
        creater: req.user._id
    })
    newRec.save()
    .then(result => {
        res.json({newRec: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/indivCategory/:catId', (req, res) => {
    Recipies.find({catName: req.params.catId})
    .populate("creater", "_id name")
    .then(recipies=> {
        res.json({recipies})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/meal/:mealId', (req, res) => {
    Recipies.find({_id: req.params.mealId})
    .populate("creater", "_id name")
    .then(meal=> {
        res.json({meal})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deleteRecipie/:recID', requireLogin, (req, res) => {
    Recipies.findOne({_id: req.params.recID})
    .populate("creater", "_id")
    .exec((err, rec)=>{
        if(err || !rec){
            return res.status(422).json({error: err})
        }
        if(rec.creater._id.toString() === req.user._id.toString()){
            rec.remove(req,function(err, result) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(result);
                }
            })
        }
    })
})

export default router