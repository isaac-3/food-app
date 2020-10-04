import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";

const Meal = () => {

    const {mealId} = useParams()

    useEffect(()=>{
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res=>res.json())
        .then(res => {
          console.log(res)
        })
    })

    console.log(mealId)//52874

    return (
        <div className="meal">
            here is the meal
        </div>
    );
}
 
export default Meal;