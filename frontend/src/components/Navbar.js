import React, { useState } from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@material-ui/core";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import axios from './axios'
import { useSelector, useDispatch } from 'react-redux'

const NavBar = () => {

    const [signUpInput, setSignUp] = useState(false);
    const [loginInput, setLogin] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let dispatch = useDispatch()
    let loguser = useSelector( state => state.user)

    const handleSignUpClose = () => {
        setSignUp(false)
        setName("")
        setEmail("")
        setPassword("")
    }

    const handleLoginClose = () => {
        setLogin(false)
        setEmail("")
        setPassword("")
    }

    const handleSignUp = () => {
        axios.post('/signup',{
            name,
            email, 
            password
        })
        .then(res=> {
            dispatch({ type: "LOG_IN", user: res.data})
            setSignUp(false)
            setName("")
            setEmail("")
            setPassword("")
        })
    }
    
    const handleLogin = () => {
        axios.post('/signin',{
            email, 
            password
        })
        .then(res=> {
            dispatch({ type: "LOG_IN", user: res.data.user})
            setLogin(false)
            setEmail("")
            setPassword("")
        })
    }

    
  return (
    <div className="navbar__cont">
            <Dialog open={signUpInput} onClose={() => handleSignUpClose()} aria-labelledby="form-dialog-title" style={{textAlign: "center"}}>
                <DialogTitle style={{color: "#D62828"}}>LOGIN</DialogTitle>
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column", width: "300px"}}>
                        <input
                        style={{border: "1px solid lightgrey", outlineWidth: "0", borderRadius: "30px", padding: "10px", fontFamily: "'Poppins', sans-serif", flex: "1", margin: "4px"}}
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        />
                        <input
                        style={{border: "1px solid lightgrey", outlineWidth: "0", borderRadius: "30px", padding: "10px", fontFamily: "'Poppins', sans-serif", flex: "1", margin: "4px"}}
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input
                        style={{border: "1px solid lightgrey", outlineWidth: "0", borderRadius: "30px", padding: "10px", fontFamily: "'Poppins', sans-serif", flex: "1"}}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => handleSignUpClose()}
                        color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={() => handleSignUp()}
                        color="primary">
                        LOGIN
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={loginInput} onClose={() => handleLoginClose()} aria-labelledby="form-dialog-title" style={{textAlign: "center"}}>
                <DialogTitle style={{color: "#D62828"}}>LOGIN</DialogTitle>
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column", width: "300px"}}>
                        <input
                        style={{border: "1px solid lightgrey", outlineWidth: "0", borderRadius: "30px", padding: "10px", fontFamily: "'Poppins', sans-serif", flex: "1", margin: "4px"}}
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input
                        style={{border: "1px solid lightgrey", outlineWidth: "0", borderRadius: "30px", padding: "10px", fontFamily: "'Poppins', sans-serif", flex: "1"}}
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => handleLoginClose()}
                        color="primary">
                        Cancel
                    </Button>
                    <Button 
                    onClick={() => handleLogin()}
                        color="primary">
                        LOGIN
                    </Button>
                </DialogActions>
            </Dialog>
        <div className="navbar">
                <div>
                    <IconButton>
                        <MenuRoundedIcon />
                    </IconButton>
                </div>
                <div><h1>Yummy!</h1></div>
                {loguser._id ? (
                <div className="navbar__right">
                    <div className="overlay-effect">
                        <Button>
                            <PersonRoundedIcon style={{fontSize: "16px"}}/>
                            MY RECIPIES
                        </Button>
                    </div>
                    <div className="overlay-effect">
                        <Button onClick={() =>{
                            dispatch({ type: "LOG_OUT" })
                        }}>
                            LOGOUT
                            <PersonOutlineRoundedIcon style={{fontSize: "16px"}}/>
                        </Button>
                    </div>
                </div>
                ): (
                    <div className="navbar__right">
                    <div className="overlay-effect">
                        <Button onClick={() => setLogin(true)}>
                            <PersonRoundedIcon style={{fontSize: "16px"}}/>
                            LOGIN
                        </Button>
                    </div>
                    <div className="overlay-effect">
                        <Button onClick={() => setSignUp(true)}>
                            SignUp
                            <PersonOutlineRoundedIcon style={{fontSize: "16px"}}/>
                        </Button>
                    </div>
                </div>
                )}
        </div>
    </div>
  );
};

export default NavBar;
