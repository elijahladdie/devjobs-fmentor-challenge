/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import CreateJobForm from '../../components/Job/CreateJobForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PredefinedPopover from '../../components/Job/Popover';
import AddRoleForm from '../../components/Job/AddRoleForm';
import AddReqForm from '../../components/Job/AddReqForm';




const JobTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempId, setTempId] = useState("false");
    const [isAddRoleModalOpen
        , setIsAddRoleModalOpen] = useState(false)
    const [isAddReqModalOpen
        , setIsAddReqModalOpen] = useState(false)

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [jobFormData, setJobFormData] = useState({
        company: '',
        logo: '',
        logoBackground: '',
        position: '',
        postedAt: '',
        contract: '',
        location: '',
        website: '',
        apply: '',
        description: '',
        requirements: [],
        roles: []
    });


    useEffect(() => {
        refreshTable();
    }, []);
    const validateApplication = (formData) => {
        const { company, position, location, description } = formData;

        if (!company.trim()) {
            toast.error('Please enter the company name.');
            return false;
        }

        if (!position.trim()) {
            toast.error('Please enter the position.');
            return false;
        }

        if (!location.trim()) {
            toast.error('Please enter the location.');
            return false;
        }

        if (!description.trim()) {
            toast.error('Please enter a job description.');
            return false;
        }

        return true;
    };


    const handleCreateRole = async (formData) => {

        if (tempId) {
            // Creating new job
            try {
                const { content, items } = formData;
                const itemsArray = items.split(',').map(item => item.trim());

                const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${tempId}/roles`, { content, items: itemsArray }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return toast.success(response.data.resp_msg);
            } catch (error) {
                toast.error(error?.response?.data?.resp_msg);
            } finally {
                refreshTable();
                setLoading(false);
            }

        }

        setTempId("")
        return toast.error("Some thing went wrong");

    }
    const handleCreateReq = async (formData) => {
        if (tempId) {
            // Creating new job
            try {
                const { content, items } = formData;
                const itemsArray = items.split(',').map(item => item.trim());

                const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${tempId}/requirement`, { content, items: itemsArray }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                return toast.success(response.data.resp_msg);
            } catch (error) {
                toast.error(error?.response?.data?.resp_msg);
            } finally {
                refreshTable();
                setLoading(false);
            }

        }

        setTempId("")
        return toast.error("Some thing went wrong");

    }
    const handleCreateJob = async (formData) => {
        event.preventDefault();

        if (!validateApplication(formData)) return;

        setLoading(true);

        try {
            let response;
            if (jobFormData.id) {
                // Updating existing job
                response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${jobFormData.id}/update`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                // Creating new job
                response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/create`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            toast.success(response.data.resp_msg);
            refreshTable();
            setJobFormData({
                company: '',
                logo: '',
                logoBackground: '',
                position: '',
                postedAt: '',
                contract: '',
                location: '',
                website: '',
                apply: '',
                description: '',
            });
        } catch (error) {
            toast.error(error?.response?.data?.resp_msg);
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (jobId) => {
        setLoading(true);

        try {
            const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${jobId}/delete`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.resp_msg);
            refreshTable();
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const updateApplication = async (jobId) => {
        setLoading(true);
        setIsModalOpen(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobFormData({
                id: response.data.data.id,
                company: response.data.data.company,
                logo: response.data.data.logo,
                logoBackground: response.data.data.logoBackground,
                position: response.data.data.position,
                postedAt: response.data.data.postedAt,
                contract: response.data.data.contract,
                location: response.data.data.location,
                website: response.data.data.website,
                apply: response.data.data.apply,
                description: response.data.data.description,
                requirements: response.data.data.requirements,
                roles: response.data.data.roles
            });
        } catch (error) {
            toast.error(error.response.data.resp_msg);
        } finally {
            refreshTable();
            setLoading(false);
        }
    };

    const refreshTable = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobs(response.data.data);
        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };


    const ViewBlog = async (jobId) => {
        setLoading(true);
        await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/jobs/${jobId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setLoading(false);
                setJob(response.data.data);
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.response.data.error);
            });
    };

    const closePopup = () => {
        setJob(null);
    };


    const toggleMenu = (action, jobId) => {
        switch (action) {
            case "addRole":

                setTempId(jobId)
                setIsAddRoleModalOpen(true);

                break;
            case "addRequirement":
                setTempId(jobId)
                setIsAddReqModalOpen(true);

                break;
            case "delete":
                deleteJob(jobId)
                break;
            case "viewJob":
                ViewBlog(jobId);
                break;
            case "update":
                updateApplication(jobId)
                break;
            default:
                break;
        }
    };

    return (
        <div>

            <Toaster />
            <nav className="p-4">

                <div className='nav-model  flex px-4 block w-full text-left  py-2 text-sm text-gray-700 bg-gray-100'>
                    <h1 className="text-lg underline-move">Manage Jobs</h1>

                    <button onClick={() => setIsModalOpen(true)} type="submit" className="col-span-full">Create</button>
                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                        <CreateJobForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateJob} jobFormData={jobFormData} />
                    </Modal>

                </div>

            </nav>


            <div className="">
                <table id="blogTable" className="table-auto w-full w-100">
                    <thead>
                        <tr>
                            <th className="capitalize whitespace-nowrap py-2 px-4">id</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">company</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">logo</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">position</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">postedAt</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">contract</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">location</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">website</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">apply</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">description</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">requirements</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">roles</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs?.map((job) => (
                                <tr key={job.id}>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.id}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.company.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4"><Link to={job?.logo}>here</Link></td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.position.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.postedAt.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.contract.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.location.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4"><Link to={job?.website}>here</Link></td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4"><Link to={job?.apply}>here</Link></td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.description.slice(0, 10)}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.requirements.length}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{job?.roles.length}</td>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">
                                        <PredefinedPopover
                                            trigger={
                                                <div>
                                                    show
                                                </div>
                                            }
                                            content={<>

                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("addRole", job.id)}>Add Role</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("viewJob", job.id)}>View Job</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("addRequirement", job.id)}>Add Requirement</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("delete", job.id)}>Delete</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("update", job.id)}>Update</button>
                                            </>

                                            }
                                        />

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {loading && <p>Loading...</p>}
            {job && (
                <div className="popup ">
                    <div className="popup-content   text-white pad rounded flex items-center flex-col">
                        <span className="close close-button" onClick={closePopup}>&times;</span>

                        <>
                            <div className="job-page-container">
                                <div className="float-container">
                                    <div className="hero">
                                        {/* Img */}
                                        <figure
                                            className="hero-img-holder"
                                            style={{ backgroundColor: job.logoBackground }}
                                        >
                                            <img src={job.logo} alt="logo" />
                                        </figure>

                                        {/* Hero info */}
                                        <div className="hero-info-wrapper">
                                            <div className="gen-wrapper">
                                                <h2>{job.company}</h2>
                                                <div className="url-txt">{`${job.company}.com`}</div>
                                            </div>
                                            <a
                                                href={job.website}
                                                className="btn btn-invert"
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label="button"
                                            >
                                                company site
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-info-container">
                                    {/* job info header */}
                                    <div className="job-info-header">
                                        <div className="tags-wrapper">
                                            <p className="contract-info">
                                                {job.postedAt} &middot; {job.contract}
                                            </p>
                                            <h1>{job.position}</h1>
                                            <h4>{job.location}</h4>
                                        </div>
                                        <Link
                                            to={job.apply}
                                            className="btn"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="button"
                                        >
                                            apply now
                                        </Link>
                                    </div>

                                    {/* Job description */}
                                    <p className="job-description-txt body-txt">{job.description}</p>

                                    {/* Requirements */}
                                    <div className="requirements-wrapper">
                                        <h3>Requirements</h3>
                                        {job.requirements?.map((role, index) => (
                                            <span key={index}>
                                                <p className="body-txt">{role.content}</p>
                                                <ol className="list body-txt">
                                                    {role.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item}</li>
                                                    ))}
                                                </ol>
                                            </span>
                                        ))}
                                    </div>

                                    {/* Role / Tasks */}
                                    <div className="tasks-wrapper">
                                        <h3>What You Will Do</h3>
                                        {job.roles?.map((role, index) => (
                                            <span key={index}>
                                                <p className="body-txt">{role.content}</p>
                                                <ol className="list body-txt">
                                                    {role.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item}</li>
                                                    ))}
                                                </ol>
                                            </span>
                                        ))}
                                    </div>

                                </div>
                                <footer>
                                    <div className="gen-wrapper">
                                        <h3>{job.position}</h3>
                                        <p className="founder">so digital inc.</p>
                                    </div>

                                    <a
                                        href={job.apply}
                                        className="btn"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="button"
                                    >
                                        apply now
                                    </a>
                                </footer>
                            </div>
                        </>



                    </div>
                </div>
            )}
            {isAddRoleModalOpen && (
                <Modal isOpen={isAddRoleModalOpen} onRequestClose={() => setIsAddRoleModalOpen(false)}>
                    <AddRoleForm isOpen={isAddRoleModalOpen} onClose={() => setIsAddRoleModalOpen(false)} onCreateRole={handleCreateRole} />
                </Modal>
            )}
            {isAddReqModalOpen && (
                <Modal isOpen={isAddReqModalOpen} onRequestClose={() => setIsAddReqModalOpen(false)}>
                    <AddReqForm isOpen={isAddReqModalOpen} onClose={() => setIsAddReqModalOpen(false)} onCreateReq={handleCreateReq} />
                </Modal>
            )}

        </div>
    );
}

export default JobTable;
