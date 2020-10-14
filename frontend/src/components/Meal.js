import { Chip, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const Meal = () => {

    const {mealId} = useParams()
    const [currMeal, setCurrMeal] = useState([])
    const ing = []
    let ingObj = {}

    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res=>res.json())
        .then(res => {
          setCurrMeal(res.meals[0])
        })
    },[mealId])
    
    for (const [key, value] of Object.entries(currMeal)) {
        if((key.startsWith('strIngredient') && value !== "" && value !==" ") || (key.startsWith('strMeasure') && value !== "" && value !==" ")){
            ing.push(value)
        }
    }
    console.log(currMeal)

    let halfwayThrough = Math.floor(ing.length / 2)
    let arrayFirstHalf = ing.slice(0, halfwayThrough);
    let arraySecondHalf = ing.slice(halfwayThrough, ing.length);
    arrayFirstHalf.forEach((key, i) => ingObj[key] = arraySecondHalf[i])

    return (
        <div className="meal">
            <div className="meal__header">
                <img className="meal__img" src={currMeal.strMealThumb} alt="meal"/>
                <div className="meal__info">
                    <h1>{currMeal.strMeal}</h1>
                    <h3><span className="cat__span">Category: </span>{currMeal.strCategory}</h3>
                    <p>Area: {currMeal.strArea}</p>
                    <a href={currMeal.strYoutube}>Watch Video!</a><br/>
                    <a href={currMeal.strSource}>Source!</a><br/>
                    {currMeal.strTags && <Chip size="small" label={currMeal.strTags} />}
                    <div className="meal__opts">
                        Add to my recipies!
                        <IconButton>
                            <CheckCircleRoundedIcon/>
                        </IconButton><br/>
                        Love it?
                        <IconButton>
                            <FavoriteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className="meal__details">
                <div className="meal__instructions">
                    <h1>Instructions</h1>
                    <p>&emsp;{currMeal.strInstructions}</p>
                </div>
                <div className="meal__ingredients">
                    <h1>Ingredients</h1>
                    {Object.entries(ingObj).map(([key,value]) => (
                        <p key={key}><span >{key}:</span> {value}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Meal;