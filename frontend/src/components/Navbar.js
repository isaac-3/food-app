import React from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import { IconButton, Button} from "@material-ui/core";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";

const NavBar = () => {
  return (
    <div className="navbar__cont">
        <div className="navbar">
                <div>
                    <IconButton>
                        <MenuRoundedIcon />
                    </IconButton>
                </div>
                <div><h1>Yummy!</h1></div>
                <div className="navbar__right">
                <div className="overlay-effect">
                    <Button>
                        <PersonRoundedIcon style={{fontSize: "16px"}}/>
                        LOGIN
                    </Button>
                </div>
                <div className="overlay-effect">
                    <Button>
                       SignUp
                        <PersonOutlineRoundedIcon style={{fontSize: "16px"}}/>
                    </Button>
                </div>
                </div>
        </div>
    </div>
  );
};

export default NavBar;
