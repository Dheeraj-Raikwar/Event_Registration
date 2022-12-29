import React, { useState } from "react";
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
import BlockIcon from '@mui/icons-material/Block';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;

function Eventform() {
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
  const url = "http://localhost:8080/addtask";
  const [data, setData] = useState({
    eventname: "",
    description: "",
    category: "",
    date: "",
  });
  const [display, setDisplay] = useState();

  function submit(e) {
    e.preventDefault()
    if (
      data.eventname !== "" &&
      data.description !== "" &&
      data.category !== "" &&
      data.date !== ""
    ) {
      fetch("http://localhost:3001/event_details", {
        method: "POST",
        body: JSON.stringify({
          eventname: data.eventname,
          description: data.description,
          category: data.category,
          date: data.date
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Handle data
        })
        .catch((err) => {
          console.log(err.message);
        });
      toast.success("Event created successfully", {
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
      });
      setData("")
    } else {
      toast.error("Please enter all the details", {
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        position: toast.POSITION.TOP_CENTER,
      });
      e.preventDefault();
    }
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
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
        <div className="d-flex flex-row justify-content-center m-5">
          <form className="event-form p-4 shadow-lg">
            <p className="form-heading">Event Form</p>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="label">Name<span style = {{color:'red'}}>*</span></label>
                  </td>
                  <td>
                    <input
                      onChange={(e) => handle(e)}
                      value={data.eventname}
                      className="input"
                      id="eventname"
                      placeholder="Event Name"
                      type="text"
                    ></input>
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <label className="label">Description<span style = {{color:'red'}}>*</span></label>
                  </td>
                  <td>
                    <input
                      className="input"
                      onChange={(e) => handle(e)}
                      value={data.description}
                      id="description"
                      placeholder="description"
                      type="text"
                    ></input>
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <label className="label">Category<span style = {{color:'red'}}>*</span></label>
                  </td>
                  <td>
                    <select
                      className="box-width"
                      onChange={(e) => handle(e)}
                      value={data.category}
                      id="category"
                      placeholder="category"
                    >
                      <option value="Arts">
                        Arts
                      </option>
                      <option value="Air">
                        Air
                      </option>
                      <option value="Engineering">
                        Engineering
                      </option>
                      <option value="Health & Medicine">
                        Health & Medicine
                      </option>
                      <option value="Youth">
                        Youth
                      </option>
                      <option value="Music">
                        Music
                      </option>
                      <option value="Travel & Hospitality">
                        Travel & Hospitality
                      </option>
                    </select>
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <label className="label">Date<span style = {{color:'red'}}>*</span></label>
                  </td>
                  <td>
                    <input
                      className="input box-width"
                      onChange={(e) => handle(e)}
                      value={data.date}
                      id="date"
                      placeholder="event date"
                      type="date"
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <div class="text-center">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => submit(e)}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Box>
  );
}

export default Eventform;
