import axios from '../api/axios';
import { useForm } from 'react-hook-form';

const CancelModal = ({showCancelModal, setShowCancelModal, orderId, setMsg}) => {

    const {
        register, 
        formState: {errors}, 
        handleSubmit,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            cancel_reason: '',
        }
    });

    const onSubmit = async (data) => {
        await axios.post(`/admin/cancel/${orderId}`, data)
        .then((res) => {
            setMsg(res.data.success);
            setShowCancelModal(false);
        })
    }

    const handleClose = () => {
        setShowCancelModal(false);
    }

    return(
        <>
            {showCancelModal && (
                <div className='modal'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Atšaukti užsakymą</h5>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                                <div className='modal-body'>
                                    <div className="form-group">
                                        <label>Nurodyti priežastį:</label>
                                        <textarea className="form-control" {...register("cancel_reason", {required: true})}></textarea>
                                        <div className="invalid-feedback">
                                            {errors.cancel_reason?.type === "required" && "Privaloma įvesti priežastį"}
                                        </div>
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button type='submit' className='btn btn-danger'>Patvirtinti</button>
                                    <button type='submit' className='btn btn-danger' onClick={handleClose}>Atšaukti</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CancelModal;