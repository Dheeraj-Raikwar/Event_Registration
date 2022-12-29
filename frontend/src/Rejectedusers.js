import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FlakyIcon from "@mui/icons-material/Flaky";
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const drawerWidth = 240;

function Rejectedusers() {

  const [approval, setApproval] = useState(false);

  const navigate = useNavigate();
  const itemsList = [
    {
      text: "Accepted users",
      icon: <HowToRegIcon />,
      onClick: () => navigate("/acceptedUsers"),
    },
    {
      text: "Registration approval",
      icon: <FlakyIcon />,
      onClick: () => navigate("/registerApproval"),
    },
    {
      text: "Create event",
      icon: <AddBoxIcon />,
      onClick: () => navigate("/createEvent"),
    },
    {
      text: "Rejected users",
      icon: <BlockIcon />,
      onClick: () => navigate("/rejectedUsers"),
    }
  ];

  const [data, setData] = useState([]);
  function fetchData() {
    fetch("http://localhost:3001/user_request_rejected")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, [approval]);


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className="d-flex flex-row">
              <img
                className="logo"
                src="https://secure.getmeregistered.com/images/gmr-logo-check.png"
              ></img>
              <p>Event Registration Application</p>
            </div>
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/Events")}>
            User
          </Button>
          Admin
          <Button color="inherit" onClick={() => navigate("/")}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {itemsList.map((item, index) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div>
          <table className="table">
            <thead className="table-info">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile No</th>
                <th scope="col">DOB</th>
                <th scope="col">Gender</th>
                <th scope="col">Profile Picture</th>
              </tr>
            </thead>
            {data.map((user) => (
              <tbody className="table-data shadow-lg">
                <tr>
                  <td>{user.user_firstname}</td>
                  <td>{user.user_lasttname}</td>
                  <td>{user.user_work_email}</td>
                  <td>{user.user_mobile}</td>
                  <td>{(user.user_dob).split('T')[0]}</td>
                  <td>{user.user_gender}</td>
                  <td><img className="profile-pic"
                    src={user.user_image} /></td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </Box>
    </Box>
  );
}

export default Rejectedusers;
