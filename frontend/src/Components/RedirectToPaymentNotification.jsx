import React from "react";
import { BsEmojiSmileFill} from "react-icons/bs";

const RedirectToPaymentNotification = ({ message }) => {

    return (
        <>
            {message && (
                <div className='modal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-body'>
                                <div className="mb-3">
                                    <BsEmojiSmileFill size={24} color="green"/>
                                </div>
                                <div className="fw-bold">
                                    {message}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RedirectToPaymentNotification;