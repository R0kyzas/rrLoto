import React from "react";
import { BsEmojiSmileFill, BsEmojiFrownFill } from "react-icons/bs";

const ResponseNotification = ({ data, showNotification, setshowNotification }) => {

    const handleClose = () => {
        setshowNotification(false);
    }
    return (
        <>
            {showNotification && (
                <div className='modal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            {data.success ?
                                <>
                                    <div className='modal-body'>
                                        <div className="mb-3">
                                            <BsEmojiSmileFill size={24} color="green"/>
                                        </div>
                                        <div className="fw-bold">
                                            {data.data}
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='modal-body'>
                                        <div className="mb-3">
                                            <BsEmojiFrownFill size={24} color="red" />
                                        </div>
                                        <div className="fw-bold">
                                            {data.error}
                                        </div>
                                    </div>
                                </>
                            }
                                <div className='modal-footer'>
                                    <button type='submit' class='btn btn-danger' onClick={handleClose}>Supratau</button>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ResponseNotification;