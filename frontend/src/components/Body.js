import React, { useEffect, useState } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Body = () => {

    const [cats, setCat] = useState([])

    useEffect(()=>{
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res=>res.json())
        .then(res => {
            setCat(res.categories)
        })
    },[])

    if(cats.length === 0){
        return <p>loading</p>
    }

    return (
        <div className="body">
            <div className="body__search_box">
                <input placeholder="Search By Name!"/>
                <IconButton>
                    <SearchRoundedIcon/>
                </IconButton>
            </div>
            <div className="body__cats">
                {cats.map(cat=>(
                    <Link to={`/category/${cat.strCategory}`} style={{ textDecoration: 'none' }} key={cat.idCategory}>
                        <div className="body__cats__indiv" >
                            <img src={cat.strCategoryThumb} alt="category"/>
                            <p>{cat.strCategory}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
 
export default Body;