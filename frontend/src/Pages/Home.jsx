import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Modal from '../Components/Modal';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import Checkbox from '../Components/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

const TICKET_URL = '/ticket';

const Home = (props) => {
    
    const [postMessage, setPostMessage] = useState('');

    const { promiseInProgress } = usePromiseTracker({area: props.area});

    const cookies = new Cookies();

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

    const cookieData = new Date();
    cookieData.setTime(cookieData.getTime() + ( 60 * 10000));

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
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
            setPostMessage(res.data.success);
        })
        .catch((err)=>{console.log(err)})
    }

    const onSubmit = (data) => {
        data.token = localStorage.getItem('userToken');
        const userToAdd = {name: data.name, lastname: data.lastname, token: data.token, quantity: data.quantity};
        const prevUsers = cookies.get('users') || [];
        const filteredUser = prevUsers.filter(prev => prev.name !==userToAdd.name || prev.lastname !== userToAdd.lastname);
    
        const newUsers = [...filteredUser, userToAdd];
        cookies.set('users', newUsers, {path: '/', expires: cookieData})

        trackPromise(postTicketData(data));
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
                    <div className='container d-flex justify-content-center'>
                        <div className="card card-ticket text-center">
                            <div className="card-header">
                                Loterijos bilietas
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Įveskite savo vardą'
                                            {...register("name", {required: true})}
                                        />
                                        <div class="invalid-feedback">
                                            {errors.name?.type === "required" && "Vardas yra privalomas"}
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <input 
                                            type='text' 
                                            className='form-control' 
                                            placeholder='Įveskite savo pavardę'
                                            {...register("lastname", {required: true})}
                                        />
                                        <div class="invalid-feedback">
                                            {errors.lastname?.type === "required" && "Pavardė yra privaloma"}
                                        </div>
                                    </div>
                                    <p>Pasirinkite bilietų kiekį:</p>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket1"
                                            name='quantity' 
                                            value={1}
                                            {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadio1'>
                                            1 bilietas
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
                                        <label className='form-check-label' htmlFor='flexRadio1'>
                                            5 bilietas
                                        </label>
                                    </div>
                                    <div className='form-check'>
                                        <input 
                                            className='form-check-input' 
                                            type="radio" 
                                            id="ticket3"
                                            name='quantity' 
                                            value={100}
                                             {...register("quantity", {required: true})}
                                        />
                                        <label className='form-check-label' htmlFor='flexRadio1'>
                                            100 bilietas
                                        </label>
                                    </div>
                                    <div class="invalid-feedback">
                                            {errors.quantity?.type === "required" && "Bilietų kiekį privaloma pasirinkti"}
                                    </div>
                                    
                                    <p>Pasirinkite mokėjimo būdą:</p>
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
                                            Grynais
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
                                            Internetu
                                        </label>
                                    </div>
                                    <div class="invalid-feedback">
                                            {errors.payment?.type === "required" && "Mokėjimo būdą privaloma pasirinkti"}
                                    </div>
                                    <button 
                                        type='submit' 
                                        className='btn btn-primary'
                                    >
                                        Nusipirkti
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