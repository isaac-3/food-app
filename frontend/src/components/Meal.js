import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import './Meal.css'
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
    },[])
    
    for (const [key, value] of Object.entries(currMeal)) {
        if(key.startsWith('strIngredient') && value !== "" || key.startsWith('strMeasure') && value !== ""){
            ing.push(value)
        }
    }

    let halfwayThrough = Math.floor(ing.length / 2)
    let arrayFirstHalf = ing.slice(0, halfwayThrough);
    let arraySecondHalf = ing.slice(halfwayThrough, ing.length);
    arrayFirstHalf.forEach((key, i) => ingObj[key] = arraySecondHalf[i])

    return (
        <div className="meal">
            <div className="meal__header">
                <img className="meal__img" src={currMeal.strMealThumb} alt="meal"/>
            </div>
            <div className="meal__details">
                <div className="meal__instructions">
                    <p>{currMeal.strInstructions}</p>
                </div>
                <div className="meal__ingredients">
                    {Object.entries(ingObj).map(([key,value]) => (
                        <p key={key}><span style={{fontWeight: "bold"}}>{key}:</span> {value}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Meal;