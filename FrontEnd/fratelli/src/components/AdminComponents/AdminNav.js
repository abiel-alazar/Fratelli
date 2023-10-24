import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


function AdminNav() {
  const [logout, setLogout] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const exist = JSON.parse(localStorage.getItem('token'))
    if(exist){ 
     setLogout(true)
    }
   
  },[])

  const logOut = ()=>{
    localStorage.clear()
    navigate('/login')
    setLogout(false)
  }
  return (
    <div className='App'>
      <Navbar bg="dark" expand="md" fixed="top">
        <Container fluid>
          <img width="3%" height="3%" src='https://static.wixstatic.com/media/a03b2a_0d36255e42ae49d4892d9b1f5791a072~mv2_d_3810_5334_s_4_2.png/v1/crop/x_1549,y_1812,w_822,h_888/fill/w_520,h_562,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/a03b2a_0d36255e42ae49d4892d9b1f5791a072~mv2_d_3810_5334_s_4_2.png' />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="/adminmessages" className='text-warning'>Messages</Nav.Link>
              <Nav.Link href="/adminhome" className='text-warning'>Services</Nav.Link>
              <Nav.Link href="/adminupcoming" className='text-warning'>Upcoming Events</Nav.Link>
              <Nav.Link href="/booking" className='text-warning'>Booked</Nav.Link>
            </Nav>
            {logout?<Nav.Link  onClick={logOut} className='text-warning'>Logout</Nav.Link>:
            <Nav.Link href="/login" className='text-warning'>SignIn</Nav.Link>}

            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="ms-3 me-2"
                aria-label="Search"
                size='sm'
              />
              <Button  variant="outline-warning" size='sm'>Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>

      </Navbar>
      
    </div>
  )
}

export default AdminNav