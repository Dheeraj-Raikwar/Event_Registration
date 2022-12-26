import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Adminlogin from './Adminlogin';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

export default function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const navigate = useNavigate()
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <div className='d-flex flex-row'><img className="logo" src="https://secure.getmeregistered.com/images/gmr-logo-check.png"></img>
                <p>Event Registration Application</p></div>
            </Typography>
            <Button color="inherit" onClick={() => navigate("/Events")}>User</Button>
            <Adminlogin />
          </Toolbar>
        </AppBar>
      </Box>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            alt="Event 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            alt="Event 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSusxNrFokazZNYvvTVhS-J1uPtaMc1wkWXUg&usqp=CAU"
            alt="Event 3"
          />
        </Carousel.Item>
      </Carousel>
      </div>
  );
}