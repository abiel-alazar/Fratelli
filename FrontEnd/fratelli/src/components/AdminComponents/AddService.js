import React, { useReducer } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const reduce = (service, action) => {
    switch (action.type) {
        case ("setTitle"):
            return { ...service, eventType: action.value }
        case ("setTime"):
            return { ...service, time: action.value }
        case ("setPrice"):
            return { ...service, price: action.value }
        case ("setDescription"):
            return { ...service, description: action.value }
        case ("setImage"):
            return { ...service, image: action.value }
    }
}

function AddService(props) {
   
    const [validated, setValidated] = React.useState(false)
    const [service, dispatch] = useReducer(reduce, {
        image: "",
        eventType: "",
        time: "",
        description: "",
        price: "",
        isDeleted: 0
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        //   if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }
        setValidated(true);
        if (form.checkValidity() === true) {
            const token = JSON.parse(localStorage.getItem('token'))  
            axios.post("http://localhost:3002/services", service,  {
                headers:{"Authorization":`Bearer ${token}`}
                })
            .then(res=>{
                console.log(res.data)
                props.close()
            })
            
        }
    }

    const handleImage = async (event) => {
        if (event.target.files.length > 0) {
            const formData = new FormData();
            formData.append("img", event.target.files[0]);
            const image = await axios.post("http://localhost:3002/services/image", formData);
            dispatch({ type: "setImage", value: image.data.filename })
            console.log('Add image')
        }
    };

    return (
        <div className='row'>
            <div className='col-2'></div>
            <div className='col-6'>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Row>
                        <Form.Group as={Col} md="4">
                            <Form.Control
                                type="text"
                                placeholder="Service Title"
                                required
                                onChange={(event) => { dispatch({ type: 'setTitle', value: event.target.value }) }}
                                size='sm'
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <Form.Control
                                type="text"
                                placeholder="Timing"
                                required
                                size='sm'
                                onChange={(event) => { dispatch({ type: 'setTime', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4">
                            <Form.Control
                                type="text"
                                placeholder="Price"
                                required
                                size='sm'
                                onChange={(event) => { dispatch({ type: 'setPrice', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Choose Image</Form.Label>
                            <Form.Control
                                type='file' rows={3} required
                                size='sm'
                                onChange={(event) => handleImage(event)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                as="textarea" rows={3} required
                                placeholder='Service Description'
                                size='sm'
                                onChange={(event) => { dispatch({ type: 'setDescription', value: event.target.value }) }} />
                        </Form.Group>
                    </Row>

                    <Button variant="warning" type="submit" size='sm'>
                        Add New Service
                    </Button>
                </Form>
            </div>
            <div className='col-4'></div>
        </div>

    )
}

export default AddService