import React from "react";
import "./Navbar.css";
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
                <div className="navbar__right">
                <div>
                    <Button>
                        <PersonRoundedIcon />
                        LOGIN
                    </Button>
                </div>
                <div className="divider"></div>
                <div>
                    <Button>
                        LOGOUT
                        <PersonOutlineRoundedIcon />
                    </Button>
                </div>
                </div>
        </div>
    </div>
  );
};

export default NavBar;
