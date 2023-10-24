import axios from 'axios'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../GlobalContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AddService from './AddService';
import { useNavigate } from 'react-router';
import EditService from './EditService';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'

function AdminHome() {
    // const {token } = React.useContext(Global)
    const navigate = useNavigate()
    const [services, setServices] = React.useState([])
    const [addBtn, setAddBtn] = React.useState(false)
    const [add, setAdd] = React.useState(false)
    const [edit, setEdit] = React.useState({ status: false, id: "" })
    const [addPhoto, setPhoto] = React.useState(false)
    const [image, setImage] = React.useState("")

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get("http://localhost:3002/services/admin", {
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {
            if (res.data.status === 'success') {
                setAddBtn(true)
                setServices(res.data.value)
            } else {
                alert(res.data.value)
            }
        })
    }, [add, edit])

    const deleteService = (id, index) => {
        const token = JSON.parse(localStorage.getItem('token'))
        axios.delete(`http://localhost:3002/services/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                if (res.data.acknowledged) {

                    const copyServices = [...services]
                    const ind = copyServices.findIndex(item => item._id == id)
                    copyServices.splice(ind, 1)
                    console.log(copyServices)
                    setServices(copyServices)
                }
            })

    }

    // const editService = (id, index) => {
    //     // axios.put(`http://localhost:3002/services/${id}`)
    //     //     .then(res => {
    //     //         if (res.data.acknowledged) {
    //     //             const copyServices = [...services]

    //     //             setServices(copyServices)
    //     //         }
    //     //     })

    // }


    const closeAdd = () => {
        setAdd(false)
    }

    const closeEdit = () => {
        console.log("Edit")
        setEdit({ ...edit, status: false })
    }

    // const handleImage = async (event) => {
    //     if (event.target.files.length > 0) {
    //         const formData = new FormData();
    //         formData.append("img", event.target.files[0]);
    //         const image = await axios.post("http://localhost:3002/photos/image", formData);
    //         setImage(image.data.filename)
    //     }
    // };

    // const sendImage=()=>{
    //     axios.post('http://localhost:3002/photos', {image})
    //     .then(res=>setPhoto(false))
    // }

    return (
        <div className='mt-5' style={{ position: 'relative' }} >
           
            <h1 className='text-warning text-center mt-5'>Services</h1>
            <div className='row' style={{ position: 'relative' }}>
                <Row>
                    {addBtn && <span><Button size='sm' onClick={() => setAdd(!add)}>Add Service</Button></span>}
                    {add && <AddService close={closeAdd} />}
                    {edit.status && <EditService close={closeEdit} id={edit.id} />}
                    {services.filter(item => item.isDeleted === 0).map((service, index) => {
                        return (
                            <Col>
                                <div className='col-3 mt-4' key={index}>
                                    <Card style={{ width: '16rem' }} size='sm' bg="dark">
                                        <Card.Img variant="top" src={`http://localhost:3002/images/${service.image}`} />
                                        <Card.Body >
                                            <Card.Title className='text-warning'>{service.eventType}</Card.Title>
                                            <Card.Text className='text-light'>{service.description}</Card.Text>
                                            <Card.Subtitle className='text-secondary'>Time: {service.time}</Card.Subtitle>
                                            <Card.Subtitle className='text-secondary'>Price: {service.price}</Card.Subtitle>
                                            <Button variant="success" type="submit" size='sm' onClick={() => setEdit({ ...edit, status: !edit.status, id: service._id })}>Edit Service</Button>
                                            <Button variant="danger" type="submit" size='sm' onClick={() => deleteService(service._id, index)}>Delete Service</Button>
                                        </Card.Body>
                                    </Card>
                             </div>
                            </Col>
                        )
                    })}
                   
                </Row>
            </div>
        </div >
    )
}

export default AdminHome