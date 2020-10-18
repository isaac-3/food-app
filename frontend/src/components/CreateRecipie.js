import { Button, createMuiTheme, IconButton, TextField, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import axios from './axios'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
  });

const CreateRecipie = () => {

    const [cats, setCat] = useState([])
    const [catName, setCatName] = useState(undefined)
    const [imageUrl, setImageUrl] = useState(undefined)
    const [mealName, setMealName] = useState(undefined)
    const [instructions, setInstructions] = useState(undefined)
    let history = useHistory()
    let loguser = useSelector( state => state.user)

    const [fields, setFields] = useState([{ mn: undefined, ma: undefined }])

    useEffect(()=>{
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then(res=>res.json())
        .then(res => {
            setCat(res.categories)
        })
    },[])

    const handleAdd = () => {
        const values = [...fields];
        values.push({ mn: undefined, ma: undefined });
        setFields(values);
      }

    const handleChangeI1 = (i, event) => {
        const values = [...fields];
        values[i].mn = event.target.value;
        setFields(values);
    }

    const handleChangeI2 = (i, event) => {
        const values = [...fields];
        values[i].ma = event.target.value;
        setFields(values);
    }

    const handleCreate = () => {
        axios.post('/createRec',{
            imageUrl, 
            mealName,
            catName,
            instructions,
            fields
        },
        {
        headers: {
            "Authorization": "Bearer "+ loguser.token
        }
        })
        .then(res=> {
            history.push(`/dish/${res.data.newRec._id}`)
        })
    }

    return (
        <div className="createRecipie">
            <h1>Create Your Own Recipie!</h1>
            <input
                className="catInput"
                style={{marginTop: "14px"}}
                type="text"
                placeholder="Image Url"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
            />
            <input
                className="catInput"
                type="text"
                placeholder="Meal Name"
                value={mealName}
                onChange={(e)=>setMealName(e.target.value)}
            />
            <Autocomplete
            inputValue={catName}
            onInputChange={(e,n) => {
                setCatName(n)
            }}
            id="combo-box-demo"
            options={cats}
            getOptionLabel={(option) => option.strCategory}
            style={{ width: 300 }}
            renderInput={(params) => <ThemeProvider theme={theme}><TextField {...params} label="Choose A Category" variant="outlined" /></ThemeProvider>}
            />
            <input
                className="catInput"
                type="text"
                placeholder="Instructions"
                value={instructions}
                onChange={(e)=>setInstructions(e.target.value)}
            />
            {fields.map((field, idx) => {
                return (
                <div key={`${field}-${idx}`} className="ing__cont">
                    <input
                        className="catInput"
                        type="text"
                        placeholder="Ingredient Name"
                        onChange={e => handleChangeI1(idx, e)}
                    />
                    <input
                        className="catInput"
                        type="text"
                        placeholder="Amount"
                        onChange={e => handleChangeI2(idx, e)}
                    />
                </div>
                );
            })}
            <div>
                Add Ingredient
                <IconButton onClick={()=>handleAdd()}>
                    <AddCircleOutlineRoundedIcon/>
                </IconButton>
            </div>
            <Button className="submit__rec"
                onClick={() => handleCreate()}
            >CREATE</Button>
        </div>
    );
}
 
export default CreateRecipie;