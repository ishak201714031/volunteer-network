import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import coverImg from '../../images/extraVolunteer.png'
import './Enrolled.css'

const Enrolled = () => {

    const [bookings, setBookings] =useState([]);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();

    useEffect(() =>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    },[])
    const deleteProduct=(id) =>{
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    console.log(result);
                }
            })
           
    }
    return (
        <Container>
        <Row>
           { bookings.map(book =><Col md={4}>
                <Row className="card-style">
                    <Col md={6}>
                        <img src={coverImg} alt="" className="img-control"/>
                    </Col>
                    <Col md={6}>
                    <h4>{book.worktitle} </h4>
                    <p>{new Date(book.checkIn).toDateString('dd/MM/yyyy')}</p>
                    {/* delete */}
                    <Button onClick={() =>deleteProduct(`${book._id}`)}>Cancel</Button>
                    </Col>
                </Row>
            </Col>)
}
        </Row>
    </Container>
    );
};

export default Enrolled;