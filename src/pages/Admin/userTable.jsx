/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
// import CreateJobForm from '../../components/User/CreateJobForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PredefinedPopover from '../../components/Job/Popover';
import UpdateAdmin from '../../components/AdminNav/UpdateAdmin';




const JobTable = () => {
    const [tempId, setTempId] = useState("false");
    const [isUpdateModalOpen
        , setIsUpdateModalOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [users, setUsers] = useState([]);
    const [userFormData, setJobFormData] = useState({
        username: "",
        password: "",
        email: ""
    });


    useEffect(() => {
        refreshTable();
    }, []);


    const handleUpdate = async (formData) => {

        try {

            const response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/${formData.id}/update`, formData, {
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

        return toast.error("Some thing went wrong");

    }


    const deleteJob = async (userId) => {
        setLoading(true);

        try {
            const response = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/${userId}/delete`, {
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
    const makeAdmin = async ({ id, isAdmin }) => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/${id}/update`, { isAdmin: !isAdmin }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success(response.data.resp_msg);

        } catch (error) {
            toast.error(error.response.data.error);
        } finally {
            refreshTable();
            setLoading(false);
        }
    }
    const updateApplication = async (userId) => {
        setLoading(true);
        setIsUpdateModalOpen(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setJobFormData({
                id: userId,
                username: response.data.data.username,
                password: "",
                email: response.data.data.email
            });
        } catch (error) {
            toast.error(error.response.data.resp_msg);
        } finally {
            setLoading(false);
        }
    };

    const refreshTable = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL_LOCAL}/access`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(response.data?.data);
        } catch (error) {
            toast.error(error.response.data?.error);
        } finally {
            setLoading(false);
        }
    };



    const toggleMenu = (action, userId) => {
        switch (action) {
            case "delete":
                deleteJob(userId)
                break;

            case "update":
                updateApplication(userId)
                break;
            case "makeAdmin":
                makeAdmin({ id: userId?.id, isAdmin: userId?.isAdmin })
                break;
            default:
                break;
        }
    };

    return (
        <div className="p-4">
            <Toaster />
            <div className='  flex px-4 block w-full text-left  py-2 text-sm text-gray-700 bg-gray-100'>
                <h1 className="text-lg underline-move">Manage Users</h1>

            </div>

            <div className="">
                <table id="blogTable" className="table-auto w-full w-100">
                    <thead>
                        <tr>
                            <th className="capitalize whitespace-nowrap py-2 px-4">id</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">Email</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">username</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">Administritor</th>
                            <th className="capitalize whitespace-nowrap py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user) => (
                                <tr key={user.id}>
                                    <td className="capitalize whitespace-nowrap py-2 px-4">{user?.id}</td>
                                    <td className=" whitespace-nowrap py-2 px-4">{user?.email}</td>
                                    <td className=" whitespace-nowrap py-2 px-4">{user?.username}</td>
                                    <td className=" whitespace-nowrap py-2 px-4">{user?.isAdmin ? "Yes" : "No"}</td>
                                    <td className=" whitespace-nowrap py-2 px-4">
                                        <PredefinedPopover
                                            trigger={
                                                <div>
                                                    show
                                                </div>
                                            }
                                            content={<>

                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("update", user.id)}>Update</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("delete", user?.id)}>Delete</button>
                                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => toggleMenu("makeAdmin", { id: user?.id, isAdmin: user?.isAdmin })}>{user?.isAdmin ? "Revert " : "Make "} Admin</button>
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
            {isUpdateModalOpen && (
                <Modal isOpen={isUpdateModalOpen} onRequestClose={() => setIsUpdateModalOpen(false)}>
                    <UpdateAdmin isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} onUserUpdate={handleUpdate} userFormData={userFormData} />
                </Modal>
            )}
            {loading && <p>Loading...</p>}


        </div>
    );
}

export default JobTable;
