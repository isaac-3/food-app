import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";

const Category = () => {

    const {catId} = useParams()
    const [dishes, setDishes] = useState([])

    // useEffect(()=> {
    //     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`)
    //     .then(res=>res.json())
    //     .then(res => {
    //       setDishes(res.meals)
    //     })
    // })


    // console.log(cat)

    return (
        <div className="category">
            <div className="category__cont">
                {/* {dishes.map(dish=>(
                    <Link to={`/dish/${dish.idMeal}`}>
                        <div className="" key={dish.idMeal}>
                            <img src={dish.strMealThumb} alt="meal"/>
                            <p>{dish.strMeal}</p>
                        </div>
                    </Link>
                ))} */}
                    <Link to={`/dish/${52874}`}>
                        <div className="">
                            <img src="https://www.helpguide.org/wp-content/uploads/fast-foods-candy-cookies-pastries-768.jpg" alt="category"/>
                            <p>yum</p>
                        </div>
                    </Link>
            </div>
        </div>
    );
}
 
export default Category;