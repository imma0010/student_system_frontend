import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        // console.log("TOken: ", storedToken);

        // Check if the token exists
        if (storedToken !== null && storedToken !== undefined) {
            // Token exists in localStorage; you can use it for authentication
            // console.log('Token exists:', storedToken);
            setIsAuthenticated(true);
        }
        // console.log("Is user Authenticated: ", isAuthenticated);

        async function fetchStudents() {
            try {
                // Send data to the backend
                const response = await fetch('http://localhost:4000/api/students', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    console.log("Response is ok from server lets get its data");
                    const data = await response.json();
                    // Now 'data' contains the parsed JSON response

                    // You can access specific properties from the data object
                    const { success } = data;

                    if (success) {
                        setStudents(data.data);
                        console.log(students);
                    } else {
                        // Handle login failure, e.g., display an error message
                        console.error('Login failed');
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

        fetchStudents();
    }, [])

    const addStudent = () => {
        navigate("/add-student");
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="container mx-0 min-w-full flex flex-col items-center">
                    <button onClick={() => addStudent()} type="button" className="flex items-center px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-20 mb-5 mx-auto inline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>&nbsp;
                        Add Student
                    </button>
                </div>) : (null)}
            <div className={isAuthenticated ? "grid grid-cols-4 gap-4 w-10/12 mx-auto" : "grid grid-cols-4 gap-4 w-10/12 mx-auto mt-20"}>
                {students && students.map((student, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src="https://logowik.com/content/uploads/images/810_student.jpg" alt="" />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{student.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Gender:</b> {student.gender}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Nationality:</b> {student.nationality}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Enrolled Program:</b> {student.program}</p>
                            <Link to={"/student/" + student._id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                View Details
                                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;