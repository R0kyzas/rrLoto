import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from '../api/axios';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import ResponseNotification from '../Components/ResponseNotification';



const Profile = (props) => {

    const getToken = localStorage.getItem('userToken');
    
    const [data, setData] = useState([]);
    const [paymentSuccessMessage, setPaymentSuccessMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const { promiseInProgress } = usePromiseTracker({area: props.area});

    const query =  window.location.search.substring(1);

    useEffect(() => {
        if(getToken)
        {
            const getData = async () => {
                
                    const {data: res} = await axios.get(`/ticket-list/${getToken}`)
                    setData(res);
                
            }
            if(query)
            {
                const getPaymentAnswer = async () =>{
                    await axios.get(`/accepted/${query}`)
                    .then((res)=> {
                        if(res.status === 200)
                        {
                            setPaymentSuccessMessage(res.data);
                            setShowNotification(true);
                            window.history.pushState({}, document.title, "/" + "profile")
                        }
                    })
                }
                trackPromise(getPaymentAnswer());
            }
            trackPromise(getData());
        }
    }, [paymentSuccessMessage])
    
    return(
        <>
            {promiseInProgress &&
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    position: 'absolute', 
                    top: '0', 
                    left: '0', 
                    right: '0', 
                    height: '100%', 
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </Box>
            }
            {!promiseInProgress &&
                <div className='container d-flex profile justify-content-between'>
                    <ResponseNotification data={paymentSuccessMessage} showNotification={showNotification} setShowNotification={setShowNotification} />
                    {data && 
                        (data.orders?.map((order) => (
                            <div className="card card-ticket text-center">
                                        <div className="card-header">
                                            <div>
                                                Order number: {order.order_nr}
                                            </div>
                                        </div>
                                    <div className='card-body'>
                                    <Dropdown className='w-100'>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='w-100 d-flex justify-content-between align-items-center'>
                                            <div>
                                                Number of tickets: {order.quantity}
                                            </div>
                                            <div>
                                                {order.active === 0 && ('Waiting for activation')}
                                                {order.active === 1 && ('Actived')}
                                                {order.active === 2 && ('Cancelled')}
                                            </div>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                                <div className='tickets d-flex w-100 justify-content-between'>
                                                <Table striped bordered>
                                                    <thead>
                                                        <tr>
                                                            <th>Ticket number</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.tickets.map((ticket) => (
                                                            <tr key={ticket.id}>
                                                                <td># {ticket.ticketNumber}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        )
                    ))}
                    {data.length === 0 && (
                        <div className="card card-ticket text-center">
                            <div className="card-header">
                                <div>
                                    Order information
                                </div>
                            </div>
                            <div className='card-body'>
                                <div>
                                    You have not purchased a ticket at this time
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Profile;