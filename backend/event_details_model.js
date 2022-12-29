const { Client } = require("pg");

const pool = new Client({
  user: "postgres",
  host: "localhost",
  database: "event_registration",
  password: "dheeraj",
});

pool.connect();

const getEvent_details = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM EVENT_DETAILS", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createEvent_details = (body) => {
  return new Promise(function (resolve, reject) {
    try {
      if (!body.eventname) throw new Error("eventname field is required");
      if (!body.description) throw new Error("description field is required");
      if (!body.category) throw new Error("category field is required");
      if (!body.date) throw new Error("date field is required");
    } catch (e) {
      reject(e);
    }

    const [eventname, description, category, date] = [
      body.eventname,
      body.description,
      body.category,
      body.date,
    ];

    pool.query(
      "INSERT INTO EVENT_DETAILS (eventname, description, category, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [eventname, description, category, date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results);
        try {
          resolve(
            `YOU HAVE SUCESSFULLY CREATED THE EVENT: ${JSON.stringify(
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

pool.end;
module.exports = {
  getEvent_details,
  createEvent_details,
};
