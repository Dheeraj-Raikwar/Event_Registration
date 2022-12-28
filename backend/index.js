const express = require("express");
const app = express();
const port = 3001;
const user_event_details_model = require("./user_event_details_model");
const event_details_model = require("./event_details_model");
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app
  .route("/event_details")
  .get((req, res) => {
    // TO SHOW ALL UPCOMING EVENTS
    event_details_model
      .getEvent_details()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
        res.status(error.statusCode).send(error.message);
      });
  })
  .post((req, res) => {
    // TO CREATE AN EVENT
    event_details_model
      .createEvent_details(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 500;
        res.status(error.statusCode).send(error.message);
      });
  });

app
  .route("/user_event_details")
  // TO LIST ALL REGISTERED USERS
  .get((req, res) => {
    user_event_details_model
      .getUser_event_details()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 500;
        res.status(error.statusCode).send(error.message);
      });
  })
  // TO REGISTER USER FOR AN EVENT
  .post((req, res) => {
    user_event_details_model
      .createUser_event_details(req.body)
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        if (!error.statusCode) error.statusCode = 500;
        res.status(error.statusCode).send(error.message);
      });
  });

// TO LIST ALL REGISTERED USERS BY EVENT NAME
app.get("/user_event_details/:eId", (req, res) => {
  user_event_details_model
    .getUser_ByEvent(req.params.eId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

// TO SHOW LIST OF REGISTERED USERS WHOES REQUEST IS PENDING:
app.get("/user_request_pending", (req, res) => {
  user_event_details_model
    .getUserRequestpending()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

// TO SHOW LIST OF REGISTERED USERS WHOES REQUEST IS REJECTED:
app.get("/user_request_rejected", (req, res) => {
  user_event_details_model
    .getUserRequestrejected()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

// TO ACCEPT A REQUEST BY USER's EMAIL AND EVENT ID
app.put("/user_Accrequest", (body) => {
  console.log(req.params);
  user_event_details_model
    .acceptRequest(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

// TO REJECT A REQUEST BY USER's EMAIL AND EVENT ID
app.post("/user_Rejrequest", (req, res) => {
  user_event_details_model
    .rejectRequest(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

// TO CHECK RECORDS BY USERs EMAIL AND EVENT ID
app.post("/check_user_event_details", (req, res) => {
  user_event_details_model
    .checkDuplicacy(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      if (!error.statusCode) error.statusCode = 500;
      res.status(error.statusCode).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
