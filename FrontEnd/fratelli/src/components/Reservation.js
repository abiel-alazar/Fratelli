import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import DatePicker from 'sassy-datepicker';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const reduce = (userInfo, action) => {
    switch (action.type) {
        case ("setFname"):
            return { ...userInfo, firstName: action.value }
        case ("setLname"):
            return { ...userInfo, lastName: action.value }
        case ("setEmail"):
            return { ...userInfo, email: action.value }
        case ("setPhone"):
            return { ...userInfo, phone: action.value }
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
        case ("setDate"):
            return { ...userInfo, date: action.value }
    }
}

export default function Reservation({ route, navigation }) {
    const navigate = useNavigate()
    const [payment, setPayment] = useState(false)
    const [pay, setPay] = useState(false)
    const [date, setDate] = useState("")
    const [validated, setValidated] = useState(false);
    const location = useLocation()
    const [userInfo, dispatch] = React.useReducer(reduce, {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        date: ''
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // }

        setValidated(true);
        if (form.checkValidity() === true) {
            setPay(true)
        }
    };

    const handlePayement = (token) => {
        const info = { token }
        const payInfo = {
            name: userInfo.firstName + " " + userInfo.lastName,
            email: info.token.email,
            cardNo: info.token.card.last4,
            price: location.state.service.price
        }

        axios.post("http://localhost:3002/payment", payInfo)
            .then(res => {
                if (res.data.status === 'success') {
                    setPayment(true)
                } else {
                    alert("Sorry payement declined, please try again")
                }
            })
    }

    const onChange = (date) => {
        setDate(date.toString());
        dispatch({ type: 'setDate', value: date.toString() })
    };

    const finnishBooking = () => {

        const random = Math.floor(Math.random() * 1000000000000)
        const reservationInfo = {
            fullName: userInfo.firstName + " " + userInfo.lastName,
            phone: userInfo.phone,
            email: userInfo.email,
            eventType: location.state.service.eventType,
            address: userInfo.address + " " + userInfo.address2,
            city: userInfo.city,
            state: userInfo.state,
            zip: userInfo.zip,
            date: userInfo.date,
            confirmationNo: random,
            phone: userInfo.phone,
            done: 0
        }
        
        axios.post('http://localhost:3002/reservation', reservationInfo)
            .then(res => {
                alert(`Congratulations you booked ${location.state.service.eventType}. Your confirmation number is ${res.data.value.confirmationNo}`)
                navigate('/services')
            })
    }

    return (
        <div className="mt-5" >
        <div className='row mt-5' style={{position:"relative"}}>

            
            <div className='col-3'></div>
            <div className='col-6'>
            <h1 className='row mt-5 text-warning' >{location.state.service.eventType}</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" >
                            <Form.Control
                                required
                                type="text"
                                placeholder="First Name"
                                size='sm'
                                onChange={(event) => { dispatch({ type: 'setFname', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" >
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
                    <Form.Group className="mb-2" >
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
                    <Form.Group  className="mb-2">
                        <Form.Control
                            type="phone"
                            size='sm'
                            placeholder="Phone number"
                            required
                            onChange={(event) => { dispatch({ type: 'setPhone', value: event.target.value }) }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid phone number.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" >

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

                            <Form.Control
                                size='sm'
                                type="text"
                                placeholder="Apt/Unit..."
                                onChange={(event) => { dispatch({ type: 'setAddress2', value: event.target.value }) }}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-2" >
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
                    <Row className="mb-2">
                        <Form.Group as={Col} md="6" className="mb-2">
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
                    <Form.Group className="mb-2">
                        <Form.Control
                            type="text"
                            size='sm'
                            placeholder="Date"
                            required
                            value={date}
                            onChange={console.log('hello')}
                        />
                        <DatePicker onChange={onChange}  />
                        <Form.Control.Feedback
                            type="invalid">
                            Please provide a valid date.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {!payment? <div>
                        <Button className='mb-3' variant="warning" size="sm" type="submit">Proceed To Payment</Button>
                        {pay &&
                            <StripeCheckout
                                stripeKey='pk_test_51LP9CBLWK22xCK1uypegKLTKQbZnc6kVpwEqp54rvq0Hwe4EJRoHTo0iR3y2VIwSa7HzgaZ44eDmeHcOmSN0d4kP001ilM4WUu'
                                token={handlePayement}
                                name={userInfo.firstName + " " + userInfo.lastName}
                                email={userInfo.email}
                                amount={location.state.service.price * 100}
                                className='mb-3'
                            />}</div>:<Button className='mb-3' variant='warning' size='sm' onClick={finnishBooking}>Finnish Booking</Button>}
                   
                </Form>
            </div>
            <div className='col-3'></div>
        </div>
        </div>
    )
}

