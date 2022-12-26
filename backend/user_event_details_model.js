const {Client} = require('pg')

const pool = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'event_registration',
  password: 'Rekha@1826',
  port: 5432
}); 

pool.connect();

const getUser_event_details = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM USER_EVENT_DETAILS', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const createUser_event_details = (body) => {
  return new Promise(function(resolve, reject) {
    const [user_firstname, user_lasttname, user_work_email, user_mobile, user_dob, user_gender, user_image, event_id, event_category] = [
      body.user_firstname, body.user_lasttname, body.user_work_email, body.user_mobile, body.user_dob, body.user_gender, body.user_image, body.event_id, body.event_category
    ]
    
    pool.query('INSERT INTO USER_EVENT_DETAILS (user_firstname, user_lasttname, user_work_email, user_mobile, user_dob, user_gender, user_image, event_id, event_category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [user_firstname, user_lasttname, user_work_email, user_mobile, user_dob, user_gender, user_image, event_id, event_category], (error, results) => {
      if (error) {
        reject(error)
      }
      
       resolve(`THE USER HAS SUCESSFULLY REGISTERED FOR THE EVENT: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const getUserRequestpending = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM USER_EVENT_DETAILS WHERE status IS NULL', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const acceptRequest = (fname,id) => {
  return new Promise(function(resolve, reject) {
    console.log("fname "+fname);
    console.log("id "+id);
    pool.query("UPDATE USER_EVENT_DETAILS SET status='ACCEPTED' WHERE user_firstname = $1 AND event_id=$2", [fname,id], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results);
      resolve(`EVENT REQUEST ACCEPTED OF THE USER: ${fname} FOR Event ID: ${id}`)
    })
  })
}

const rejectRequest = (fname,id) => {
  return new Promise(function(resolve, reject) {
    console.log("fname "+fname);
    console.log("id "+id);
    pool.query("UPDATE USER_EVENT_DETAILS SET status='REJECTED' WHERE user_firstname = $1 AND event_id=$2", [fname,id], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results);
      resolve(`EVENT REQUEST REJECTED OF THE USER: ${fname} FOR Event ID: ${id}`)
    })
  })
}

const getUser_ByEvent = (eventId) => {
  
  return new Promise(function(resolve, reject) {
    pool.query("SELECT * FROM USER_EVENT_DETAILS WHERE event_id=$1",[eventId], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

pool.end; 
module.exports = {
  getUser_event_details,
  createUser_event_details,
  getUserRequestpending,
  acceptRequest,
  rejectRequest,
  getUser_ByEvent
}