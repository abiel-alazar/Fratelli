import React from 'react'
import ImageGallery from 'react-image-gallery';
import Card from 'react-bootstrap/Card';
import axios from 'axios';



function Home() {
  const [events, setEvents] = React.useState([])
  const [images, setImages] = React.useState(
    [
      {
        original: 'https://static.wixstatic.com/media/a03b2a_bf940ca376154045a20e5827a8d711a6~mv2.jpg/v1/fill/w_1779,h_1542,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/a03b2a_bf940ca376154045a20e5827a8d711a6~mv2.jpg',
        // thumbnail: 'https://picsum.photos/id/1018/250/150/',
      },
      {
        original: 'https://static.wixstatic.com/media/a03b2a_93210018e88f40b0872d49d471e581aa~mv2.jpg/v1/fill/w_2048,h_1365,al_c,q_90,enc_auto/a03b2a_93210018e88f40b0872d49d471e581aa~mv2.jpg',
        // thumbnail: 'https://picsum.photos/id/1015/250/150/',
      },
      {
        original: 'https://static.wixstatic.com/media/a03b2a_27b1669d2e2f4e219247407dc9dd0fc2~mv2_d_4928_3264_s_4_2.jpg/v1/fill/w_2328,h_1542,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/a03b2a_27b1669d2e2f4e219247407dc9dd0fc2~mv2_d_4928_3264_s_4_2.jpg',
        // thumbnail: 'https://picsum.photos/id/1019/250/150/',
      },
    ])

    React.useEffect(() => {
      
      axios.get('http://localhost:3002/events')
        .then(res => {
          setEvents(res.data)
        })
    }, [])

  return (
    <div>
      <div className='mt-5 row'>
        <div className='mt-5 col-1'></div>
        <div className='mt-5 col-10'>
          <ImageGallery items={images} />
        </div>
        <div className='mt-5 col-1'></div>

      </div>
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

export default Home