const { Client } = require("pg");
var nodemailer = require("nodemailer");
const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "event_registration",
  password: "dheeraj",
  port: 5432,
});

pool.connect();

const getUser_event_details = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM USER_EVENT_DETAILS WHERE status IS NOT NULL  AND status !='REJECTED'",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const createUser_event_details = (body) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!body.user_firstname)
        throw new Error("user_firstname field is required");
      if (!body.user_lasttname)
        throw new Error("user_lasttname field is required");
      if (!body.user_work_email)
        throw new Error("user_work_email field is required");
      if (!body.user_mobile) throw new Error("user_mobile field is required");
      if (!body.user_dob) throw new Error("user_dob field is required");
      if (!body.user_gender) throw new Error("user_gender field is required");
      if (!body.user_image)
        throw new Error("user_image field is required");
      if (!body.event_id) throw new Error("event_id field is required");
      if (!body.event_category)
        throw new Error("event_category field is required");
    } catch (e) {
      reject(e);
    }

    const [
      user_firstname,
      user_lasttname,
      user_work_email,
      user_mobile,
      user_dob,
      user_gender,
      user_image,
      event_id,
      event_category,
    ] = [
      body.user_firstname,
      body.user_lasttname,
      body.user_work_email,
      body.user_mobile,
      body.user_dob,
      body.user_gender,
      body.user_image,
      body.event_id,
      body.event_category,
    ];

    pool.query(
      "INSERT INTO USER_EVENT_DETAILS (user_firstname, user_lasttname, user_work_email, user_mobile, user_dob, user_gender, user_image, event_id, event_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        user_firstname,
        user_lasttname,
        user_work_email,
        user_mobile,
        user_dob,
        user_gender,
        user_image,
        event_id,
        event_category,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        try {
          resolve(
            `THE USER HAS SUCESSFULLY REGISTERED FOR THE EVENT: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

const getUserRequestpending = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM USER_EVENT_DETAILS WHERE status IS NULL",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getUserRequestrejected = () => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM USER_EVENT_DETAILS WHERE status = 'REJECTED'",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const acceptRequest = (body) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!body.email) throw new Error("email field is required");
      if (!body.eventId) throw new Error("eventId field is required");
    } catch (e) {
      reject(e);
    }

    pool.query(
      "UPDATE USER_EVENT_DETAILS SET status='ACCEPTED' WHERE user_firstname = $1 AND event_id=$2",
      [body.email, body.eventId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        sendEmail(body.fname, body.email, body.eventId);
        resolve(
          `EVENT REQUEST ACCEPTED OF THE USER ${body.email} FOR Event ID: ${body.eventId}`
        );
      }
    );
  });
};

const rejectRequest = (body) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!body.email) throw new Error("email field is required");
      if (!body.eventId) throw new Error("eventId field is required");
    } catch (e) {
      reject(e);
    }
    pool.query(
      "UPDATE USER_EVENT_DETAILS SET status='REJECTED' WHERE user_work_email = $1 AND event_id=$2",
      [body.email, body.eventId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results);
        resolve(
          `EVENT REQUEST REJECTED OF THE USER ${body.email} FOR Event ID: ${body.eventId}`
        );
      }
    );
  });
};

const getUser_ByEvent = (eventId) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!eventId) throw new Error("eventId field is required");
    } catch (e) {
      reject(e);
    }
    pool.query(
      "SELECT * FROM USER_EVENT_DETAILS WHERE event_id=$1 AND status !='REJECTED'",
      [eventId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const checkDuplicacy = (body) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!body.email) throw new Error("email field is required");
      if (!body.eventId) throw new Error("eventId field is required");
    } catch (e) {
      reject(e);
    }

    pool.query(
      "SELECT EXISTS(SELECT * FROM user_event_details WHERE user_work_email = $1 AND event_id = $2)",
      [body.email, body.eventId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

// Function to send email
function sendEmail(userName, userEmail, eventId) {
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "dheerajraikwar@jmangroup.com",
      pass: "Compact@23",
    },
  });

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: '"Registration successful" <dheerajraikwar@jmangroup.com>', // sender address (who sends)
    to: userEmail, // list of receivers (who receives)
    subject: "Hello " + userName, // Subject line
    text: "Registration of the event.", // plaintext body
    html:
      "<p>Thank you for registering the event. This is confirmation email that you have successfully registered for the event.</p>\
    <br>\
    <h5>Your Name: </h5> <p>" +
      userName +
      " </p><br>\
    <h5>Event Id: </h5> <p>" +
      eventId +
      " </p><br>", // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Email sent: " + info.response);
  });
}

pool.end;
module.exports = {
  getUser_event_details,
  createUser_event_details,
  getUserRequestpending,
  getUserRequestrejected,
  acceptRequest,
  rejectRequest,
  getUser_ByEvent,
  checkDuplicacy
};
