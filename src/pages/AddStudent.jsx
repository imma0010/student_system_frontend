import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        nationality: "",
        enrollmentDate: "",
        program: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        // console.log("Login button clicked");
        event.preventDefault();
        console.log("Formdata", formData);

        try {
            const token = localStorage.getItem("token")
            // Send data to the backend
            const response = await fetch('http://localhost:4000/api/student/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(formData),
            });
            console.log(response);

            if (response.ok) {
                // console.log("Response is ok from server lets get its data");
                const data = await response.json();
                // Now 'data' contains the parsed JSON response

                // You can access specific properties from the data object
                const { success, message } = data;

                if (success) {
                    alert(message);
                    navigate("/");
                } else {
                    // Handle login failure, e.g., display an error <messagex></messagex>
                    console.error('Login failed');
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
                // You can display an error message to the user
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token == undefined || token == null) {
            navigate("/");
        }
    }, [])

    return (
        <form className="mt-20 w-1/2 mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-lg text-center">Add Student to the System</h1>
            <br />
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                <input type="text" id="name" value={formData.name} name="name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Name" required />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                    <input type="date" id="dob" value={formData.dob} name="dob" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Name" required />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="">Select a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Email</label>
                <input type="email" id="email" value={formData.email} name="email" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="student@mail.com" required />
            </div>
            <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Phone No.</label>
                <input type="text" id="phone" value={formData.phone} name="phone" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+977 xxxxxxx" required />
            </div>
            <div className="mb-6">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Address</label>
                <input type="text" id="address" value={formData.address} name="address" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Address" required />
            </div>
            <div className="mb-6">
                <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nationality of Student</label>
                <input type="text" id="nationality" value={formData.nationality} name="nationality" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nationality of Student" required />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="enrollmentDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enrollment Date</label>
                    <input type="date" id="enrollmentDate" value={formData.enrollmentDate} name="enrollmentDate" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Student Name" required />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Program</label>
                    <input type="text" id="program" value={formData.program} name="program" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Program Student Enrolled in" required />
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    )
}

export default AddStudent;