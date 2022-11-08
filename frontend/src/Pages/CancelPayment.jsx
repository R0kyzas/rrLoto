import React, { useEffect } from 'react';
import axios from '../api/axios';
import RedirectToPaymentNotification from '../Components/RedirectToPaymentNotification';
import { useNavigate } from 'react-router-dom'

const CancelPayment = () => {
    const query =  window.location.search.substring(1);
    const navigate = useNavigate();

    useEffect(()=>{
        if(query)
        {
            const cancelOrder = async () => {
                await axios.get(`/canceled/${query}`)
                .then((res) => {
                    if(res.status === 200)
                    {
                        const timer = setTimeout(() => {
                            navigate('/profile');
                        }, 3000);

                        return () => {
                            clearTimeout(timer);
                        }
                    }
                })
            }

            cancelOrder();
        }
    })

    return(
        <RedirectToPaymentNotification message={'We cancel payment and cancel your order! Redirecting to tickets...'}/>
    )
}

export default CancelPayment;