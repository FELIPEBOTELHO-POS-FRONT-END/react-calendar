import {
  Avatar,
  Box,
  Icon,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { signOutEndpoint } from "../api/apiRequests";
import { useAuthContext } from "../contexts/authContext";

const useStyle = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224,224,224)",
    padding: "16px",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

export default function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signout() {
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <IconButton
        aria-label="Usuário"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signout}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
