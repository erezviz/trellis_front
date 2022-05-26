
import * as React from 'react';
import { useState } from 'react'

// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';




export const TaskDetails = (props) => {
    const [isOpen, setIsOpen] = useState(true)

    const modalStyle = {
        display: isOpen ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,

    }

    return (

        <section style={{ display: `${modalStyle}` }} className="task-details">

            <h2>I am Task Details</h2>
        </section>
    )
}




