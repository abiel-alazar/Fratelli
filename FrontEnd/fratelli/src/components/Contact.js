import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router';
import emailjs from 'emailjs-com'

const reduce = (userInfo, action) => {
    switch (action.type) {
        case ("setName"):
            return { ...userInfo, fullName: action.value }
        case ("setSubject"):
            return { ...userInfo, subject: action.value }
        case ("setEmail"):
            return { ...userInfo, email: action.value }
        case ("setMessage"):
            return { ...userInfo, message: action.value }
    }
}

function Contact() {
    const navigate = useNavigate()
    const [validated, setValidated] = React.useState(false);
    const [userInfo, dispatch] = React.useReducer(reduce, {
        fullName: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        //   if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }
        setValidated(true);
        if (form.checkValidity() === true) {
            axios.post("http://localhost:3002/messages", userInfo)
            .then(res=>{
                if(res.data.status === "success"){
                    alert("Your message is successfully sent")
                    let templateParams = {
                        name: userInfo.fullName,
                        message: userInfo.message
                    };
                    emailjs.send('service_hosorfq', 'template_4gl51st', templateParams, '33D3cMOxFHHZ7C54i').then((res)=>{
                        
                        navigate('/')
                    },(err)=>{
                        alert(err);
                    })
                }else{
                    alert(res.data.value)
                }
            })
        }

    };

    return (
        <div className='row mt-5 text-warning' style={{position:'relative'}}>
            <div className='col-4'></div>
            <div className='col-4'>
                <h3 className='mt-5'>Please Leave Me Message Here</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Full Name"
                            size='sm'
                            onChange={(event) => { dispatch({ type: 'setName', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            size='sm'
                            type="email"
                            placeholder="E-mail"
                            onChange={(event) => { dispatch({ type: 'setEmail', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  >
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                            type="text"
                            size='sm'
                            placeholder="Your Message About"
                            required
                            onChange={(event) => { dispatch({ type: 'setSubject', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide Subject
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            size='sm'
                            placeholder="Your Message"
                            required
                            onChange={(event) => { dispatch({ type: 'setMessage', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please Write a Message.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mt-3'>
                        <Button variant="warning" size='sm' type="submit">Send Message</Button>
                    </Form.Group>

                </Form>
            </div>
            <div className='col-4'></div>

        </div>
    )
}

export default Contact