import React, { useReducer } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Global from './GlobalContext';


const reduce = (userInfo, action) => {
    switch (action.type) {
        case ("setEmail"):
            return { ...userInfo, email: action.value }
        case ("setPassword"):
            return { ...userInfo, password: action.value }
    }
}


function Login() {

    const {passUser, passToken, navBar} = React.useContext(Global)
    const [validated, setValidated] = React.useState(false)
    const [userInfo, dispatch] = useReducer(reduce, {
        email: "",
        password: ""
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
            
            axios.post('http://localhost:3002/user/login', userInfo)
                .then(res => {
                    if (res.data.type === 'success') {
                       
                        localStorage.setItem('token', JSON.stringify(res.data.value))
                        const decoded = jwt_decode(res.data.value)
                        if (decoded.role === "Admin") {
                            
                            passToken(res.data.value)
                            passUser(decoded)
                            navigate('/adminhome')
                            navBar()
                        } else {
                            passUser("")
                            navigate('/')
                            navBar()
                        }
                    } else {
                        alert(res.data.value)
                    }
                })
        }
    }
    return (
        <div className='row mt-5 text-warning' style={{position:'relative'}}>
            <h1 className='text-center mt-5'>Welcome</h1>
            <div className='col-4'></div>
            <div className='col-4'>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            required
                            size='sm'
                            onChange={(event) => { dispatch({ type: 'setEmail', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            size='sm'
                            onChange={(event) => { dispatch({ type: 'setPassword', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Text className="text-light">Don't have account <NavLink to='/signup'>Sign Up</NavLink> here!!!</Form.Text>
                    </Form.Group>

                    <Button variant="warning" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div className='col-4'></div>
        </div>
    )
}

export default Login