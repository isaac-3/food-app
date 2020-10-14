import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPage = ({dishes, loading}) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="category__cont">
            {dishes.map(dish=>(
                <Link to={`/dish/${dish.idMeal}`} style={{ textDecoration: 'none' }}>
                    <div className="cat__dish" key={dish.idMeal}>
                        <img className="cat__img" src={dish.strMealThumb} alt="meal"/>
                        <p className="cat__txt">{dish.strMeal}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
 
export default CategoryPage;