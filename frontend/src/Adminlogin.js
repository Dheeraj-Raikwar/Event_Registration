import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

export default function Adminlogin() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const url = "";
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [display, setDisplay] = useState()
    function login(e) {
        e.preventDefault()
        if ((data.email === 'rekha@jmangroup.com') && (data.password === '1234567')) {
            navigate("/registeredUsers")
            handleClose()
        }
        else {
            toast.error("You're not an admin", {
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                position: toast.POSITION.TOP_CENTER,
            });
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
            <Button onClick={handleOpen} color="inherit">Admin Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography class="form-heading" id="modal-modal-title" variant="h6" component="h2">
                        Admin Login
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form>
                            <input
                                onChange={(e) => handle(e)}
                                value={data.email}
                                className='input'
                                id="email"
                                placeholder="email"
                                type="text"
                            ></input><br /><br />
                            <input
                                onChange={(e) => handle(e)}
                                value={data.password}
                                className='input'
                                id="password"
                                placeholder="password"
                                type="text"
                            ></input><br /><br />
                            <div class="text-center"><button type="submit" class="btn btn-info" onClick={(e) => login(e)}>
                                Login
                            </button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal></div>
    )
}