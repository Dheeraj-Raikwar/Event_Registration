import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';
import Registerform from './Registerform';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Adminlogin from './Adminlogin';
import { useNavigate } from 'react-router-dom';


export default function EventCard() {

    const navigate = useNavigate()
    const [events, setEvents] = useState([]);
    
    function fetchData() {
        fetch("http://localhost:3001/event_details")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setEvents(data);
      })

    };

    useEffect(() => {
        fetchData();
    }, []);
    
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
            <div className='d-flex flex-row'><img className= "logo" src="https://secure.getmeregistered.com/images/gmr-logo-check.png"></img>
            <p>Event Registration Application</p></div>
          </Typography>
          <Button color="inherit" onClick = {() => navigate('/')}>Home</Button>
          <Adminlogin/>
        </Toolbar>
      </AppBar>
    </Box>
        <div className='flex'>
        
            {events.map(event => (
              <Grid container m={3}>
                <Grid item>                
                    <Card sx={{ maxWidth: 385 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://t4.ftcdn.net/jpg/04/46/22/83/360_F_446228330_C8nqvb4hllsFg67RZfVQ32nOOGdtPmNv.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {event.eventname} - {event.category}

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                 {event.description}<br/>
                                {event.date}

                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Registerform id={event.id}/>
                        </CardActions>
                    </Card>
                   
                </Grid></Grid>
                ))}
                
        </div></div>
    );
}