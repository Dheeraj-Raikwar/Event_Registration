import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const drawerWidth = 240;

function RegisteredUsers() {
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);
  const [select, setSelect] = useState(false);
  const [filterdata, setfilterdata] = useState([]);

  function fetchData() {
    fetch("http://localhost:3001/user_event_details")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
    fetch("http://localhost:3001/event_details")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearch(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, [select]);

  function handleChange(event_id) {
    fetch("http://localhost:3001/user_event_details/" + event_id)
      .then((response) => response.json())
      .then((data) => {
        console.log("filter" + data);
        setfilterdata(data);
        setSelect(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }



  const navigate = useNavigate();
  const itemsList = [
    {
      text: "Registered users",
      icon: <HowToRegIcon />,
      onClick: () => navigate("/registeredUsers"),
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
  ];

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
          <br />
          Rekha
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
        <FormControl className="filter-width">
          <InputLabel id="demo-simple-select-label">Events: </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="default"
            label="Events: "
            onChange={(e) => handleChange(e.target.value)}
          >
            <MenuItem value="default" disabled selected>
              ALL
            </MenuItem>
            {search.map((event) => (
              <MenuItem value={event.id}>
                {event.eventname}: {event.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl><br /><br />

        <table className="table">
          <thead className="table-info thead-width">
            <tr>
              <th scope="col">First_Name</th>
              <th scope="col">Last_Name</th>
              <th scope="col">email</th>
              <th scope="col">Mobile_No</th>
              <th scope="col">DOB</th>
              <th scope="col">Gender</th>
              <th scope="col">Profile Pic</th>
            </tr>
          </thead>
          {select ? (
            <>
              {filterdata.length > 0 &&
                <>
                  {filterdata.map((user) => (
                    <tbody className="table-data shadow-lg">
                      <tr>
                        <td>{user.user_firstname}</td>
                        <td>{user.user_lasttname}</td>
                        <td>{user.user_work_email}</td>
                        <td>{user.user_mobile}</td>
                        <td>{user.user_dob}</td>
                        <td>{user.user_gender}</td>
                        <td><img
                    src={"data:image/png;base64," + user.user_image.data}/></td>
                      </tr>
                    </tbody>
                  ))}
                </>
              }
            </>
          ) : (
            <>
              {data.map((user) => (
                <tbody className="table-data shadow-lg">
                  <tr>
                    <td>{user.user_firstname}</td>
                    <td>{user.user_lasttname}</td>
                    <td>{user.user_work_email}</td>
                    <td>{user.user_mobile}</td>
                    <td>{user.user_dob}</td>
                    <td>{user.user_gender}</td>
                    <td><img
                    src={"data:image/png;base64," + user.user_image.data}/></td>
                  </tr>
                </tbody>
              ))}
            </>
          )}
        </table>
      </Box>
    </Box>
  );
}

export default RegisteredUsers;
