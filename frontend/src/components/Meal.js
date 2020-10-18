import { Chip, IconButton, Snackbar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/Alert';
import axios from './axios';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const Meal = () => {

    const {mealId} = useParams()
    const [currMeal, setCurrMeal] = useState([])
    const [fields__open, setFieldOpen] = useState(false)
    let loguser = useSelector( state => state.user)

    let dispatch = useDispatch()
    let history = useHistory()

    const ing = []
    let ingObj = {}

    useEffect(()=>{
        if(mealId.length === 24){
            axios.get(`/meal/${mealId}`)
            .then(res=>{
                setCurrMeal(res.data.meal[0])
                dispatch({ type: "SET_CATEGORY", category: res.data.meal[0].catName})
            })
        }else{
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(res=>res.json())
            .then(res => {
              setCurrMeal(res.meals[0])
              dispatch({ type: "SET_CATEGORY", category: res.meals[0].strCategory})
            })
        }
    },[mealId])
    
    for (const [key, value] of Object.entries(currMeal)) {
        if((key.startsWith('strIngredient') && value !== "" && value !==" ") || (key.startsWith('strMeasure') && value !== "" && value !==" ")){
            ing.push(value)
        }
    }

    let halfwayThrough = Math.floor(ing.length / 2)
    let arrayFirstHalf = ing.slice(0, halfwayThrough);
    let arraySecondHalf = ing.slice(halfwayThrough, ing.length);
    arrayFirstHalf.forEach((key, i) => ingObj[key] = arraySecondHalf[i])

    const handleFieldClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFieldOpen(false)
    };

    const handleRecipie = () => {
        if(!loguser._id){
            setFieldOpen(true)
        }
        if(loguser.recipies && loguser.recipies.some(e => e.id === mealId)){
            axios.patch('/removeRec', {
                mealId
                },
                {
                headers: {
                    "Authorization": "Bearer "+ loguser.token
                }
            })
            .then(res=> {
                dispatch({ type: "REMOVE_REC", recipie: res.data.recipies})
            })
        }else{
            let newRec = {
                id: currMeal.idMeal ? currMeal.idMeal : currMeal._id,
                img: currMeal.strMealThumb ? currMeal.strMealThumb : currMeal.imageUrl,
                name: currMeal.strMeal ? currMeal.strMeal : currMeal.mealName
            }
            axios.patch('/addRec', {
                recipie: newRec
                },
                {
                headers: {
                    "Authorization": "Bearer "+ loguser.token
                }
            })
            .then(res=> {
                dispatch({ type: "ADD_REC", recipie: res.data.recipies})
            })
        }
    }
    const handleLike = () => {
        if(!loguser._id){
            setFieldOpen(true)
        }
        if(loguser.likes && loguser.likes.includes(mealId)){
            axios.patch('/removeLike', {
                mealId
                },
                {
                headers: {
                    "Authorization": "Bearer "+ loguser.token
                }
            })
            .then(res=> {
                dispatch({ type: "REMOVE_LIKE", like: res.data.likes})
            })
        }else{
            axios.patch('/addLike', {
                id: currMeal.idMeal ? currMeal.idMeal : currMeal._id
                },
                {
                headers: {
                    "Authorization": "Bearer "+ loguser.token
                }
            })
            .then(res=> {
                dispatch({ type: "ADD_LIKE", like: res.data.likes})
            })
        }
    }

    const handleDelete = () => {
        axios.delete(`/deleteRecipie/${mealId}`, {
            headers: {
                "Authorization": "Bearer "+ loguser.token
            }
        })
        .then(res=>{
            history.push("/")
            dispatch({ type: "REMOVE_MEAL", meal: res.data._id})
        })
    }

    let contHeight = 0
    if(currMeal.strInstructions){
        contHeight = currMeal.strInstructions.length
    }
    let hhh = contHeight > 1100 ? "100%" : "92vh"
    const checkColor = loguser.recipies === undefined ? null : loguser.recipies.some(e => e.id === mealId) ? "green" : "black"
    const likeColor = loguser.likes === undefined ? null : loguser.likes.includes(mealId) ? "red" : "black"
    const mapEntries = mealId.length === 24 ? currMeal.ingredients : ingObj

    return (
        <div className="meal" style={{height: hhh}}>
            <Snackbar 
            open={fields__open} 
            autoHideDuration={3000} 
            onClose={handleFieldClose} 
            anchorOrigin={{ vertical: "top", horizontal: "center" }} className="mustLogin__alert">
                <Alert severity="error">
                    Must Be Logged In
                </Alert>
            </Snackbar>
            <div className="meal__header">
                <img className="meal__img" src={currMeal.strMealThumb ? currMeal.strMealThumb : currMeal.imageUrl} alt="meal"/>
                <div className="meal__info">
                    <h1>{currMeal.strMeal ? currMeal.strMeal : currMeal.mealName}</h1>
                    <h3><span className="cat__span">Category: </span>{currMeal.strCategory ? currMeal.strCategory : currMeal.catName}</h3>
                    {currMeal.creater && <p>Creater: {currMeal.creater.name}</p>}
                    {currMeal.strArea && <p>Area: {currMeal.strArea}</p>}
                    {currMeal.strYoutube && <a href={currMeal.strYoutube}>Watch Video!</a>}<br/>
                    {currMeal.strSource && <a href={currMeal.strSource}>Source!</a>}
                    {currMeal.strTags && <Chip size="small" label={currMeal.strTags} />}
                    <div className="meal__opts">
                        Add to my recipies!
                        <IconButton onClick={() => handleRecipie()}>
                            <CheckCircleRoundedIcon style={{color: checkColor}}/>
                        </IconButton>
                        <br/>
                        Love it?
                        <IconButton onClick={() => handleLike()}>
                            <FavoriteIcon style={{color: likeColor}}/>
                        </IconButton>
                    </div>
                    {currMeal.creater && <div>
                        Remove My Recipie
                        <IconButton onClick={()=> handleDelete()}>
                            <HighlightOffRoundedIcon/>
                        </IconButton>
                    </div>}
                </div>
            </div>
            <div className="meal__details">
                <div className="meal__instructions">
                    <h1>Instructions</h1>
                    <p>&emsp;{currMeal.strInstructions ? currMeal.strInstructions : currMeal.instructions}</p>
                </div>
                <div className="meal__ingredients">
                    <h1>Ingredients</h1>
                    {mapEntries && Object.entries(mapEntries).map(([key,value]) => (
                        <p key={key}><span >{key}:</span> {value}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Meal;