import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        console.log("Model shown:", isModalOpen)
        setIsModalOpen(!isModalOpen);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    const deleteStudent = async() => {
        try {
            // Send data to the backend
            const response = await fetch('http://localhost:4000/api/student/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Now 'data' contains the parsed JSON response

                // You can access specific properties from the data object
                const { success, message } = data;

                if (success) {
                    alert(message);
                    navigate("/");
                } else {
                    // Handle login failure, e.g., display an error <messagex></messagex>
                    console.error('Editing failed');
                }
            } else {
                // Handle login error
                console.error('Login failed');
                // You can display an error message to the user
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        async function fetchStudentData() {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                }

                const token = localStorage.getItem("token");

                if (token) {
                    headers.Authorization = token;
                    setIsAuthenticated(true);
                }

                // Send data to the backend
                const response = await fetch('http://localhost:4000/api/student/' + id, {
                    method: 'GET',
                    headers: headers
                });

                if (response.ok) {
                    // console.log("Response is ok from server lets get its data");
                    const data = await response.json();

                    const { success } = data;

                    if (success) {
                        setStudent(data.data);
                        // console.log(student);
                    } else {
                        console.error('Data not retrieved');
                    }
                } else {
                    // Handle login error
                    console.error('Login failed');
                    const data = await response.json();
    
                    const {success, message} = data;
                    if(message == "Token Expired. Log in again") {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }
                }
            } catch (error) {
                // Handle network or other errors
                console.error('Error:', error);
            }
        }

        fetchStudentData();
    }, [])
    return (
        student ? (
            <div className="mt-20 w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center mx-auto">
                <img className="max-w-sm mx-auto rounded-t-lg" src="https://logowik.com/content/uploads/images/810_student.jpg" alt="" />
                <h1 className="text-3xl font-bold mb-2">{student.name}</h1>
                <p className="mb-1"><b>Date of Birth: </b>{student.dob.split("T")[0]}</p>
                <p className="mb-1"><b>Gender: </b>{student.gender}</p>
                <p className="mb-1"><b>Address: </b>{student.address}</p>
                <p className="mb-1"><b>Nationality: </b>{student.nationality}</p>
                <p className="mb-1"><b>Program: </b>{student.program}</p>
                {student.email ? (<p className="mb-1"><b>Email: </b>{student.email}</p>) : (null)}
                {student.phone ? (<p className="mb-1"><b>Contact Number: </b>{student.phone}</p>) : (null)}
                {student.enrollment_date ? (<p className="mb-1"><b>Enrolled On: </b>{student.enrollment_date.split("T")[0]}</p>) : (null)}
                {isAuthenticated ? (
                    <div className="flex space-x-4 justify-evenly mb-4 mt-4">
                        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/student/edit/" + id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
                            </svg>&nbsp;
                            Edit
                        </button>
                        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded" onClick={toggleModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>&nbsp;
                            Delete
                        </button>
                        {isModalOpen ? (
                            <div style={{backdropFilter: 'blur(4px)'}} id="popup-modal" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex">
                                <div className="relative w-full max-w-md max-h-full">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button onClick={hideModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <div className="p-6 text-center">
                                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this student?</h3>
                                            <button onClick={deleteStudent} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                Yes, I'm sure
                                            </button>
                                            <button onClick={hideModal} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): (null)}
                    </div>
                ) : (null)}
            </div>
        ) : (
            <p className="mt-20 text-center">Loading</p>
        )
    )
}

export default StudentDetail;