import React, { useEffect, useState } from 'react';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Body = () => {

    const [cats, setCat] = useState([])
    let history = useHistory()

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
                <input placeholder="search"/>
                <IconButton>
                    <SearchRoundedIcon/>
                </IconButton>
            </div>
            <div className="body__cats">
                {cats.map(cat=>(
                    <Link to={`/category/${cat.strCategory}`} style={{ textDecoration: 'none' }}>
                        <div className="body__cats__indiv" key={cat.idCategory}>
                            <img src={cat.strCategoryThumb} alt="category"/>
                            <p>{cat.strCategory}</p>
                        </div>
                    </Link>
                ))}
                    {/* <Link to={`/category/${'Beef'}`}>
                        <div className="body__cats__indiv">
                            <img src="https://www.helpguide.org/wp-content/uploads/fast-foods-candy-cookies-pastries-768.jpg" alt="category"/>
                            <p>yum</p>
                        </div>
                    </Link> */}
            </div>
        </div>
    );
}
 
export default Body;