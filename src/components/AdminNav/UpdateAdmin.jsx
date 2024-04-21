/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const UpdateAdmin = ({ isOpen, onClose, onUserUpdate, userFormData }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    useEffect(() => {
        if (userFormData) {
            setFormData({
                id: userFormData.id,
                username: userFormData.username || '',
                email: userFormData.email || '',
                password: userFormData.password || '',
            });
        }
    }, [userFormData]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUserUpdate(formData);
        setFormData({
            content: '',
            items: ''
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2 className='flex justify-center p-4 job-tile'>Update User</h2>
            <form onSubmit={handleSubmit} className='job-model grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className="flex flex-col items-start justify-start">
                    <label>Email:</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange}  />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange}  />
                </div>
                <div className="flex flex-col items-start justify-start">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange}  />
                </div>
                <button type="submit" className="col-span-full">Update</button>
            </form>
        </Modal>
    );
};

export default UpdateAdmin;
