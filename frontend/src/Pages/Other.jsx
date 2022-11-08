import React, {useEffect, useState } from 'react';
import axios from '../api/axios';
import { RandomReveal } from "react-random-reveal";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const Other = (props) => {
    const [winners, setWinners] = useState([]);
    const { promiseInProgress } = usePromiseTracker({area: props.area});

    useEffect(() => {
        const getWinners = async () => {
            const {data: res} = await axios.get('/lottery-tickets');
            setWinners(res.winners);
        }
        trackPromise(getWinners());
    }, []);

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

                <div className='container d-flex admin-panel justify-content-center'>
                    {winners && winners?.map((winner) => (
                        <div className="card card-ticket text-center">
                            <div className="card-header">
                                Lottery winner
                            </div>
                            <div className='card-body'>
                                <div>
                                    <RandomReveal
                                        isPlaying
                                        duration={20}
                                        revealDuration={3}
                                        characters={String(winner.ticket.ticketNumber)}
                                        characterSet={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                                        onComplete={() => ({ shouldRepeat: false, delay: 3 })}
                                    />
                                </div>
                                <div>
                                <RandomReveal
                                        isPlaying
                                        duration={20}
                                        revealDuration={3}
                                        characters={winner.ticket.name}
                                        onComplete={() => ({shouldRepeat: false, delay: 3})}
                                
                                    /> 
                                </div>
                                <div>
                                    <RandomReveal
                                        isPlaying
                                        duration={20}
                                        revealDuration={3}
                                        characters={winner.ticket.lastname }
                                        onComplete={() => ({shouldRepeat: false, delay: 3})}
                                    
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {winners.length === 0 && (
                        <div className="card card-ticket text-center">
                            <div className="card-header">
                                Information
                            </div>
                            <div className='card-body'>
                                There is currently no winner selected
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default Other;