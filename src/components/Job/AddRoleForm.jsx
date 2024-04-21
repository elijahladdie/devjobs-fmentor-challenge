/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';

const AddRoleForm = ({ isOpen, onClose, onCreateRole }) => {
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
        onCreateRole(formData);
        setFormData({
            content: '',
            items: ''
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
             <h2 className='flex justify-center p-4 job-tile'>Add Role</h2>
            <form onSubmit={handleSubmit} className='job-model grid grid-cols-1  gap-4'>
                <div  className="flex flex-col items-start justify-start">
                    <label>Role Content:</label>
                    <input type="text" name="content" value={formData.content} onChange={handleChange} required />
                </div>
                <div  className="flex flex-col items-start justify-start">
                    <label>Role Items:</label>
                    <textarea name="items" value={formData.items} onChange={handleChange} required />
                </div>
                <button type="submit" className="col-span-full">Add Role</button>
            </form>
        </Modal>
    );
};

export default AddRoleForm;
