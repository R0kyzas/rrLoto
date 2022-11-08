import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import ResponseNotification from '../Components/ResponseNotification';
import RedirectToPaymentNotification from '../Components/RedirectToPaymentNotification';

const TICKET_URL = '/ticket';

const Home = (props) => {
    
    const [postMessage, setPostMessage] = useState('');
    const [paymentRedirectMessage, setPaymentRedirectMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const { promiseInProgress } = usePromiseTracker({area: props.area});


    useEffect(() => {
        if(!localStorage.getItem('userToken'))
        {
            const getTokens = async () => {
                const {data: res} = await axios.get('/token');
                localStorage.setItem('userToken', res.token);
            };
            trackPromise(getTokens());
        }
    },[]);

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            lastname: "",
            token: '',
            quantity: 0,
            payment: 0,
        }
    });

    const postTicketData = async (data) => {
        await axios.post(TICKET_URL, data)
        .then((res) => {
            if(res.status === 200)
            {
                if(data.payment === '2')
                {
                    setPaymentRedirectMessage('Redirecting to the payment...');
                    getPayment(res.data.orderId);
                }else if(data.payment === '1')
                {
                    setShowNotification(true);
                    setPostMessage(res.data);
                }

                reset();
            }
        })
    }

    const onSubmit = (data) => {
        data.token = localStorage.getItem('userToken');
        trackPromise(postTicketData(data));
    }

    const getPayment = async (data) => {
        await axios.get(`/payment/${data}`)
        .then((res) => {
            window.location.href = res.data;
        })
    }

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
                <>
                    <ResponseNotification data={postMessage} showNotification={showNotification} setShowNotification={setShowNotification} />
                    <RedirectToPaymentNotification message={paymentRedirectMessage} />
                    <div className='container d-flex justify-content-center'>
                        <div className="card card-ticket text-center">
                            <div className="card-header">
                                Lottery Ticket
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Enter your name'
                                            {...register("name", {required: true})}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.name?.type === "required" && "Name is required"}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Enter your last name'
                                            {...register("lastname", {required: true})}
                                        />
                                        <div className="invalid-feedback">
                                            {errors.lastname?.type === "required" && "Last name is required"}
                                        </div>
                                    </div>
                                    <p>Select the number of tickets:</p>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket1"
                                            name='quantity' 
                                            value={1}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket1'>
                                            1 ticket - 5 EUR
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket2"
                                            name='quantity' 
                                            value={5}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket2'>
                                            5 tickets - <del>25 EUR</del>, <span className='text-danger fw-bold'>20 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket3"
                                            name='quantity' 
                                            value={10}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket3'>
                                            10 tickets - <del>50 EUR</del>, <span className='text-danger fw-bold'>39 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket4"
                                            name='quantity' 
                                            value={15}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket4'>
                                            15 tickets - <del>75 EUR</del>, <span className='text-danger fw-bold'>56 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket5"
                                            name='quantity' 
                                            value={20}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket5'>
                                            20 tickets - <del>100 EUR</del>, <span className='text-danger fw-bold'>70 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket6"
                                            name='quantity' 
                                            value={30}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket6'>
                                            30 tickets - <del>150 EUR</del>, <span className='text-danger fw-bold'>96 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket7"
                                            name='quantity' 
                                            value={50}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket7'>
                                            50 tickets - <del>250 EUR</del>, <span className='text-danger fw-bold'>150 EUR</span>
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket8"
                                            name='quantity' 
                                            value={100}
                                             {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='ticket8'>
                                            100 tickets - <del>500 EUR</del>, <span className='text-danger fw-bold'>260 EUR</span>
                                        </label>
                                    </div>
                                    <div className="invalid-feedback">
                                            {errors.quantity?.type === "required" && "The number of tickets must be selected"}
                                    </div>
                                    
                                    <p>Choose a payment method:</p>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio"
                                            id="paymentCash"
                                            name='payment' 
                                            value={1}
                                             {...register("payment", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadio1'>
                                            Cash
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio"
                                            id="paymentBank"
                                            name='payment' 
                                            value={2}
                                            {...register("payment", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadio1'>
                                            Bank transfer
                                        </label>
                                    </div>
                                    <div className="invalid-feedback">
                                            {errors.payment?.type === "required" && "The payment method must be selected"}
                                    </div>
                                    <button 
                                        type='submit' 
                                        className='btn btn-danger'
                                    >
                                        Buy
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Home;