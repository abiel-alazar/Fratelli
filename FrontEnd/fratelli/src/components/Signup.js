import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router';

const reduce = (userInfo, action) => {
    switch (action.type) {
        case ("setFname"):
            return { ...userInfo, firstName: action.value }
        case ("setLname"):
            return { ...userInfo, lastName: action.value }
        case ("setEmail"):
            return { ...userInfo, email: action.value }
        case ("setPassword"):
            return { ...userInfo, password: action.value }
        case ("setAddress"):
            return { ...userInfo, address: action.value }
        case ("setAddress2"):
            return { ...userInfo, address2: action.value }
        case ("setCity"):
            return { ...userInfo, city: action.value }
        case ("setState"):
            return { ...userInfo, state: action.value }
        case ("setZip"):
            return { ...userInfo, zip: action.value }
    }
}

function Signup() {
    const [validated, setValidated] = React.useState(false);
    const [userInfo, dispatch] = React.useReducer(reduce, {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        role: "User",
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        //   if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }
        setValidated(true);
        if (form.checkValidity() === true) {
            axios.post('http://localhost:3002/user', userInfo)
            .then(res=>{
                if(res.data.type === 'success'){
                    alert(res.data.value)
                    navigate('/login')
                }else{
                    alert(res.data.value)
                }
            })
        }

    };

    return (
        <div className='row mt-5 text-warning' style={{position:'relative'}}>
            <h1 className='text-center mt-5'>Welcome</h1>
            <div className='col-4'></div>
            <div className='col-4'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                size='sm'
                                onChange={(event) => { dispatch({ type: 'setFname', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                size='sm'
                                type="text"
                                placeholder="Last name"
                                onChange={(event) => { dispatch({ type: 'setLname', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group  >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            size='sm'
                            placeholder="Email"
                            required
                            onChange={(event) => { dispatch({ type: 'setEmail', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group  >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            size='sm'
                            placeholder="Password"
                            required
                            onChange={(event) => { dispatch({ type: 'setPassword', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                size='sm'
                                placeholder="Address"
                                onChange={(event) => { dispatch({ type: 'setAddress', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control
                                size='sm'
                                type="text"
                                placeholder="Apt"
                                onChange={(event) => { dispatch({ type: 'setAddress2', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group  >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            size='sm'
                            placeholder="City"
                            required
                            onChange={(event) => { dispatch({ type: 'setCity', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" >
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                size='sm'
                                placeholder="State"
                                required
                                onChange={(event) => { dispatch({ type: 'setState', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                size='sm'
                                placeholder="Zip"
                                required
                                onChange={(event) => { dispatch({ type: 'setZip', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Text className='text-light'>Don't have account <NavLink to='/login'>Sign In</NavLink> here!!!</Form.Text>
                    </Form.Group>
                    <Button variant="warning" type="submit">Submit form</Button>
                </Form>
            </div>
            <div className='col-4'></div>
        </div>
    )
}

export default Signup