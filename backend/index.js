const express = require('express')
const app = express()
const port = 3001
const user_event_details_model = require('./user_event_details_model')
const event_details_model = require('./event_details_model')
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

// TO SHOW ALL UPCOMING EVENTS
app.get('/event_details', (req, res) => {
  event_details_model.getEvent_details()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// TO CREATE AN EVENT
app.post('/event_details', (req, res) => {
  event_details_model.createEvent_details(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})

// TO LIST ALL REGISTERED USERS
app.get('/user_event_details', (req, res) => {
  user_event_details_model.getUser_event_details()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// TO LIST ALL REGISTERED USERS BY EVENT NAME
app.get('/user_event_details/:eId', (req, res) => {
  user_event_details_model.getUser_ByEvent(req.params.eId)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})

// TO REGISTER USER FOR AN EVENT
app.post('/user_event_details', (req, res) => {
  user_event_details_model.createUser_event_details(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})

 // TO SHOW LIST OF REGISTERED USERS WHOES REQUEST IS PENDING:
app.get('/user_request_pending', (req, res) => {
  user_event_details_model.getUserRequestpending()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

// TO ACCEPT A REQUEST BY USER's FIRST NAME AND EVENT ID
app.put('/user_Accrequest/:fname/:id/:email', (req, res) => {
  console.log(req.params)
  user_event_details_model.acceptRequest(req.params.fname,req.params.id,req.params.email)
  .then(response => {
    res.status(200).send(response);

  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})


// TO REJECT A REQUEST BY USER's FIRST NAME AND EVENT ID
app.put('/user_Rejrequest/:fname/:id', (req, res) => {
  console.log(req.params)
  user_event_details_model.rejectRequest(req.params.fname,req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})

// TO CHECK RECORDS BY USER's FIRST NAME AND EVENT ID
app.get('/check_user_event_details/:fname/:id', (req, res) => {
  console.log(req.params)
  user_event_details_model.checkDuplicacy(req.params.fname,req.params.id)
  .then(response => {
    res.status(200).send(response);

  })
  .catch(error => {
    console.log(error)
    res.status(500).send(error);
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})