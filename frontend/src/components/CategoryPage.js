import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = ({dishes, loading}) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="category__cont">
            {dishes.map(dish=>(
                <Link to={`/dish/${dish.idMeal ? dish.idMeal : dish._id}`} style={{ textDecoration: 'none' }} key={dish.idMeal ? dish.idMeal: dish._id}>
                    <div className="cat__dish">
                        <img className="cat__img" src={dish.strMealThumb ? dish.strMealThumb : dish.imageUrl} alt="meal"/>
                        <p className="cat__txt">{dish.strMeal ? dish.strMeal : dish.mealName}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
 
export default CategoryPage;