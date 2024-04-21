/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const CreateJobForm = ({ isOpen, onClose, onCreate, jobFormData }) => {
    const [formData, setFormData] = useState({
        company: '',
        logo: '',
        logoBackground: '',
        position: '',
        postedAt: '',
        contract: '',
        location: '',
        website: '',
        apply: '',
        description: ''
    });
    useEffect(() => {
        if (jobFormData) {
            setFormData({
                id: jobFormData.id,
                company: jobFormData.company || '',
                logo: jobFormData.logo || '',
                logoBackground: jobFormData.logoBackground || '',
                position: jobFormData.position || '',
                postedAt: jobFormData.postedAt || '',
                contract: jobFormData.contract || '',
                location: jobFormData.location || '',
                website: jobFormData.website || '',
                apply: jobFormData.apply || '',
                description: jobFormData.description || '',
            });
        }
    }, [jobFormData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
        // Clear form data after submission if needed
        setFormData({
            company: '',
            logo: '',
            logoBackground: '',
            position: '',
            postedAt: '',
            contract: '',
            location: '',
            website: '',
            apply: '',
            description: ''
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2 className='flex justify-center p-4 job-tile'>Create Job</h2>
            <form onSubmit={handleSubmit} className='job-model grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='flex flex-col items-start justify-start'>
                    <label>Company:</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Logo:</label>
                    <input type="text" name="logo" value={formData.logo} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Logo Background:</label>
                    <input type="text" name="logoBackground" value={formData.logoBackground} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Position:</label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Posted At:</label>
                    <input type="text" name="postedAt" value={formData.postedAt} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Contract:</label>
                    <input type="text" name="contract" value={formData.contract} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Website:</label>
                    <input type="text" name="website" value={formData.website} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Apply:</label>
                    <input type="text" name="apply" value={formData.apply} onChange={handleChange} required />
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="col-span-full">Create</button>
            </form>

        </Modal>
    );
};

export default CreateJobForm;
