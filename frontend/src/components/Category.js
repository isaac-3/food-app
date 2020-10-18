import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import axios_backend from './axios'
import CategoryPage from './CategoryPage';
import Pagination from './Pagination';

const Category = () => {

    const {catId} = useParams()
    const [dishes, setDishes] = useState([])
    
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dishPerPage] = useState(8);

    useEffect(()=> {
        const fetchDishes = async () => {
            setLoading(true);
            const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`)

            const res2 = await axios_backend.get(`/indivCategory/${catId}`)

            let allDishes = [...res.data.meals, ...res2.data.recipies]

            setDishes(allDishes)
            setLoading(false);
          };
      
          fetchDishes();
    },[])
    
    if(!dishes){
        return <h1>loading</h1>
    }

    const indexOfLastDish = currentPage * dishPerPage;
    const indexOfFirstDish = indexOfLastDish - dishPerPage;
    const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="category">
            <CategoryPage dishes={currentDishes} loading={loading} />
            <Pagination
                dishPerPage={dishPerPage}
                totalDishes={dishes.length}
                paginate={paginate}
            />
        </div>
    );
}
 
export default Category;