import { Button } from 'react-bootstrap';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Global from '../GlobalContext';


const reduce = (myEvent, action) => {
  switch (action.type) {
    case ('setEvent'):
      return { ...myEvent, eventTitle: action.value }
    case ('setImage'):
      return { ...myEvent, image: action.value }
  }
}

function AdminUpcoming() {
  // const {token} = React.useContext(Global)
  const [addBtn, setAddBtn] = React.useState(false)
  const [add, setAdd] = React.useState(false)
  const [validated, setValidated] = React.useState(false)
  const [events, setEvents] = React.useState([])
  const [myEvent, dispatch] = React.useReducer(reduce, {
    eventTitle: "",
    image: "",
    isDeleted: 0
  })

  const handleImage = async (event) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("img", event.target.files[0]);
      const image = await axios.post("http://localhost:3002/events/image", formData);
      dispatch({ type: "setImage", value: image.data.filename })
    }
  };

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    axios.get('http://localhost:3002/events/admin', {
      headers:{"Authorization":`Bearer ${token}`}
      }).then(res => {
        console.log(res.data)
        if(res.data.status = 'success'){
          setAddBtn(true)
          setEvents(res.data.value)
        }else{
          alert(res.data.value)
        }
       
      })
   
  }, [add])

  const handleSubmit = (event) => {

    const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    // }
    setValidated(true);
    if (form.checkValidity() === true) {
      const token = JSON.parse(localStorage.getItem('token'))  
      axios.post("http://localhost:3002/events", myEvent,{
        headers:{"Authorization":`Bearer ${token}`}
        })
        .then(res => {
          setAdd(false)
        })
    }
  }

  const handleDelete = (id, index) => {
    const token = JSON.parse(localStorage.getItem('token')) 
    axios.delete(`http://localhost:3002/events/${id}`,{
      headers:{"Authorization":`Bearer ${token}`}
      })
    .then(res=>{
      if(res.data.status = 'success'){
        const copyEvents = [...events]
        const ind = copyEvents.findIndex(item=>item._id == id)
        copyEvents.splice(ind,1)
        setEvents(copyEvents)
      }else{
        alert("Sorry Event Not Deleted")
      }
    })
  }

  return (
    <div className='mt-5' style={{position:'absolute'}}>
      
      <h1 className='mt-5'></h1>
      {addBtn && <span><Button size='sm' style={{position:'fixed'}}onClick={() => setAdd(!add)}>Add Event</Button></span>}
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-4'>
          {add && <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
              <Form.Control
                type="text"
                placeholder="Event Title"
                required
                onChange={(event) => { dispatch({ type: 'setEvent', value: event.target.value }) }}
                size='sm'
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Event Title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-2' >

              <Form.Control
                type='file' rows={3} required
                size='sm'
                onChange={(event) => handleImage(event)}
              />
            </Form.Group>
            <Button variant="warning" type="submit" size='sm'>
              Add New Event
            </Button>
          </Form>}
        </div>
        <div className='col-6'></div>
      </div>
      {events.filter(item => item.isDeleted === 0).map((item, index) => {
        return (
          <div className='row mt-5' key={index}>
            <div className='col-3'></div>
            <div className='col-6'>

              <Card className="bg-dark text-white">
                <Card.Img src={`http://localhost:3002/images/${item.image}`} alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>{item.eventTitle}</Card.Title>
                  <Button variant="danger" size='sm' onClick={() => handleDelete(item._id, index)}>Remove Event</Button>
                </Card.ImgOverlay>
              </Card>

            </div>
            <div className='col-3'></div>
          </div>
        )
      })}
    </div>
  )
}

export default AdminUpcoming