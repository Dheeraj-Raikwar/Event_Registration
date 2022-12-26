import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function Registerform(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emailError, setEmailError] = useState("")
  const [mobileError, setMobileerror] = useState("")
  const [dobError, setDoberror] = useState("")
  const [profilePhoto, setProfilephoto] = useState()
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    workemail: "",
    mobile: "",
    dob: "",
    gender: "",
  });
  function image(e){

    setProfilephoto(e.target.files[0])

  }




  function validateDomain(email, companyName) {
    return companyName.some((val) => email.includes(val));
  }
  function validateEmail(e) {
    if (!validateDomain(data.workemail, ['jmangroup.com', 'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'])) {
      setEmailError("please enter email with valid domain name")
    }
    else if (validateDomain(data.workemail, ['jmangroup.com', 'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'])) {
      setEmailError("")
    }
  }

  function validateMobile(e) {
    if (((data.mobile.length > 10) || (data.mobile.length < 10)) && (!(data.mobile.match('[0-9]{10}')))) {
      setMobileerror("Please enter valid mobile number");
    }
    else {
      setMobileerror("");
    }
  }

  function validateDob(e) {
    const date = new Date(data.dob)
    const userAge = 2022 - (date.getFullYear())
    console.log(userAge)
    if (userAge < 18) {
      setDoberror("Age must be above 18")
    }
    else {
      setDoberror("")
    }
  }
  function submit(e) {
    if (
      data.firstname !== "" &&
      data.lastname !== "" &&
      data.workemail !== "" &&
      data.mobile !== "" &&
      data.dob !== "" &&
      data.gender !== ""
    ) {
      fetch("http://localhost:3001/user_event_details", {
        method: "POST",
        body: JSON.stringify({
          user_firstname: data.firstname,
          user_lasttname: data.lastname,
          user_work_email: data.workemail,
          user_mobile: data.mobile,
          user_dob: data.dob,
          user_gender: data.gender,
          user_image: profilePhoto,
          event_id: props.id,
          event_category: "general",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(profilePhoto)
          // Handle data
        })
        .catch((err) => {
          console.log(err.message);
        });

      alert("Registration Successful!");
    } else {
      alert("Please enter all the details");
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
    <div>
      <Button onClick={handleOpen}>Register</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            class="form-heading"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Registration Form
          </Typography>
          <hr />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className="label">First Name</label>
                    </td>
                    <td>
                      <input
                        onChange={(e) => handle(e)}
                        value={data.firstname}
                        className="input"
                        id="firstname"
                        placeholder="First Name"
                        type="text"
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">Last Name</label>
                    </td>
                    <td>
                      <input
                        className="input"
                        onChange={(e) => handle(e)}
                        value={data.lastname}
                        id="lastname"
                        placeholder="Last Name"
                        type="text"
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">Work Email</label>
                    </td>
                    <td>
                      <input
                        className="input"
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.workemail}
                        id="workemail"
                        placeholder="Work Email"
                        type="email"
                      ></input>
                      <span style={{ color: "red" }}>{emailError}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">Mobile Number</label>
                    </td>
                    <td>
                      <input
                        className="input"
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.mobile}
                        id="mobile"
                        placeholder="Mobile Number"
                        type="tel"
                      ></input>
                      <span style={{ color: "red" }}>{mobileError}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">DOB</label>
                    </td>
                    <td>
                      <input
                        className="input date-width"
                        onChange={(e) => handle(e)}
                        value={data.dob}
                        id="dob"
                        placeholder="Date Of Birth"
                        type="date"
                      ></input>
                      <span style={{ color: "red" }}>{dobError}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">Gender</label>
                      <br />
                    </td>
                    <td>
                      <select
                        className="input select-width"
                        onChange={(e) => handle(e)}
                        value={data.gender}
                        id="gender"
                        placeholder="gender"
                      >
                        <option className="input" value="Male">
                          Male
                        </option>
                        <option className="input" value="Female">
                          Female
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="label">Upload Profile Photo</label>
                    </td>
                    <td>
                      <input type="file" id="profile" name="profile" accept="image/png, image/jpg, image/jpeg" 
onChange={(e) => image(e)}></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-success"
                  onClick={(e) => {
                    validateEmail(e);
                    validateMobile(e);
                    validateDob(e);
                    submit(e);
                  }}
                >
                  Register
                </button>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
