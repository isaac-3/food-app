import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { IconButton } from '@material-ui/core';
import axios from './axios'
import { Link } from 'react-router-dom';

const MyRecipies = () => {

    let loguser = useSelector( state => state.user)
    let dispatch = useDispatch()

    const handleRecipie = (mealId) => {   
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
    }

    let contHeight = 0
    if(loguser.recipies){
        contHeight = loguser.recipies.length
    }

    let ch = contHeight >= 6 ? "100%" : "92vh"


    return (
        <div className="myRecipiesCont" style={{height: ch}}>
            {loguser.recipies && loguser.recipies.map( recipie => (
                <div className="innerCont" key={recipie.id}>
                    <Link to={`/dish/${recipie.id}`} style={{ textDecoration: 'none' }}>
                        <div className="indevRec">
                            <img src={recipie.img}  alt="my__recipie"/>
                            <h1>{recipie.name}</h1>
                        </div>
                    </Link>
                    <IconButton disableRipple={true} onClick={() => handleRecipie(recipie.id)}>
                        <HighlightOffRoundedIcon/>
                    </IconButton>
                </div>
            ))}
        </div>
    );
}
 
export default MyRecipies;