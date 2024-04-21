/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';

const AddReqForm = ({ isOpen, onClose, onCreateReq }) => {
    const [formData, setFormData] = useState({
        content: '',
        items: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateReq(formData);
        setFormData({
            content: '',
            items: ''
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
              <h2 className='flex justify-center p-4 job-tile'>Add Requirement</h2>
            <form onSubmit={handleSubmit} className='job-model grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div  className="flex flex-col items-start justify-start">
                    <label>Requirement Content:</label>
                    <input type="text" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                <div  className="flex flex-col items-start justify-start">
                    <label>Requirement Items(comma separated):</label>
                    <textarea name="items" value={formData.items} onChange={handleChange} required />
                </div>
                <button type="submit" className="col-span-full">Add Requirement</button>
            </form>
        </Modal>
    );
};

export default AddReqForm;
