import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'
import CancelModal from '../Components/CancelModal';
import ResponseNotification from '../Components/ResponseNotification';

const Admin = () => {

    const navigate = useNavigate();
    const sessionToken = sessionStorage.getItem("loggedIn");
    const [data, setData] = useState({});
    const [msg, setMsg] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [responseData, setResponseData] = useState({});

    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if(!sessionToken)
        {
            navigate('/login');
        }
        const getData = async () => {
            const {data: res} = await axios.get('/admin');
            setData(res);
        }
        getData();
    }, [msg])
    

    const handleAccept = async (data) => {
        await axios.post(`/admin/confirm/${data}`)
        .then((res) => {
            const someData = {...[res.data.success]};
            setMsg(someData)
        })
    }

    const handleCancel = (value) => {
        setOrderId(value);
        setShowCancelModal(true);
    }

    const handleClick = async() => {
        
        await axios.post(`/admin/get-winner`)
        .then((res) => {
            setResponseData(res.data);
            setShowNotification(true);
        })
    }
    
    return(
        <>
            {sessionToken &&
            <>
                <CancelModal showCancelModal={showCancelModal} setShowCancelModal={setShowCancelModal} orderId={orderId} setMsg={setMsg}/>
                <div className='container d-flex admin-panel justify-content-center'>
                    <ResponseNotification data={responseData} showNotification={showNotification} setShowNotification={setShowNotification} />
                    <div className="card card-ticket text-center">
                        <div className="card-header">
                            Admin
                        </div>
                        <div className='card-body'>
                        <div className="input-group">
                            <div className="form-outline">
                                <input 
                                    type="search" 
                                    className="form-control" 
                                    placeholder='search'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <button
                                className="btn btn-danger"
                                onClick={handleClick}
                            >
                                I??rinkti nugal??toj??
                            </button>
                        </div>
                            <Table striped bordered>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name,Lastname</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.orders?.filter((order) => 
                                        order.order_nr.includes(searchQuery) ||
                                        order.tickets[0].name.includes(searchQuery) ||
                                        order.tickets[0].lastname.includes(searchQuery) 
                                        ).map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.order_nr}</td>
                                            <td>{order.tickets[0].name} {order.tickets[0].lastname}</td>
                                            <td>
                                                
                                                {order.active === 0 && (
                                                    <>
                                                        <button className='btn btn-danger admin-table' onClick={() => handleAccept(order.id)}>Accept</button> 
                                                        <button className='btn btn-danger admin-table' onClick={() => handleCancel(order.id)}>Cancel</button>
                                                    </>
                                                )}
                                                {order.active === 1 && (
                                                    <p>Aktyvuotas</p>
                                                )}
                                                {order.active === 2 && (
                                                    <p>At??auktas</p>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Admin;