import axios from 'axios'
import React from 'react'
import Card from 'react-bootstrap/Card';


function Upcoming() {

  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    axios.get('http://localhost:3002/events')
      .then(res => {
        setEvents(res.data)
      })
  }, [])

  return (
    <div className='mt-5 text-warning' style={{position:'relative'}}>
      <h1 className='text-center pt-5'>Upcoming Events</h1>
      {events.filter(item=>item.isDeleted === 0).map((item, index) => {
        return (
          <div className='row mt-5' key={index}>
           
            <div className='col-2'></div>
            <div className='col-8'>

              <Card className="bg-dark text-white">
                <Card.Img src={`http://localhost:3002/images/${item.image}`} alt="Card image" />
                <Card.ImgOverlay>
                  <Card.Title>{item.eventTitle}</Card.Title>

                </Card.ImgOverlay>
              </Card>

            </div>
            <div className='col-2'></div>
          </div>
        )
      })}
    </div>
  )
}

export default Upcoming