import '../App.css';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useNavigate } from 'react-router'
import {Row, Col} from 'react-bootstrap'



function Services() {

  const [services, setServices] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    axios.get("http://localhost:3002/services")
      .then(res => setServices(res.data))
  }, [])

  const handleBooking = (service) => {
    navigate('/reservation', { state: { service } })
  }

  return (
    <div className='App mt-4' style={{position:'relative'}}>
      <h2>l</h2>
      <h1 className='mt-5 text-warning'> Online Booking</h1>
      {/* <div className='row mt-5' > */}
      <Row>
        {services.filter(item => item.isDeleted === 0).map((service, index) => {
          return (
      
           <Col>
            {/* <div className='col-3  mt-4 ' key={index}> */}
              <Card style={{ width: '18rem' }} size='lg' bg="dark">
                <Card.Img src={`http://localhost:3002/images/${service.image}`} />
                <Card.Body>
                  <Card.Title className='text-warning'>{service.eventType}</Card.Title>
                  <Card.Text className='text-light'>{service.description}</Card.Text>
                  <Card.Subtitle className='text-secondary'>Time: {service.time}</Card.Subtitle>
                  <Card.Subtitle className='text-secondary'>Price: ${service.price}</Card.Subtitle>
                  <Button variant="warning" size='sm' onClick={() => handleBooking(service)}>Book Now</Button>
                </Card.Body>
              </Card>
            {/* </div> */}
            </Col>
          )
        })}
</Row>

      </div>


    // </div>
  )
}

export default Services