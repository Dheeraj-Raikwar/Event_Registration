const {Client} = require('pg')

const pool = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'event_registration',
  password: 'dheeraj',
}); 

pool.connect();

const getEvent_details = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM EVENT_DETAILS', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createEvent_details = (body) => {
  return new Promise(function(resolve, reject) {
    const [eventname, description, category, date] = [ body.eventname, body.description, body.category, body.date]
    
    pool.query('INSERT INTO EVENT_DETAILS (eventname, description, category, date) VALUES ($1, $2, $3, $4) RETURNING *', [eventname, description, category, date], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results)
       resolve(`YOU HAVE SUCESSFULLY CREATED THE EVENT: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

pool.end; 
module.exports = {
    getEvent_details,
    createEvent_details,
}