import { useState } from "react";
import { Link } from "react-router-dom";

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the server with the search keyword
            const response = await fetch('http://localhost:4000/api/student/search?keyword=' + searchKeyword, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // If the response is successful, parse the JSON response
                const data = await response.json();
                const { success, message } = data;
                if (success) {
                    setMessage(message);
                    setSearchResult(data.data);
                } else {
                    setMessage(message);
                    setSearchResult([]);
                }
            } else {
                // Handle errors or display an error message
                console.error('Search request failed.');
            }
        } catch (error) {
            console.error('Error sending search request:', error);
        }
    };

    return (
        <>
            <form className="mt-20 w-1/2 mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" onChange={handleInputChange} value={searchKeyword} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Student by Name or Address" required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
                {(message == "") ? (
                    <h1 className="text-center text-lg my-5">Provide Student Name to Search for student</h1>
                ) : (<h1 className="text-center text-lg my-5">{message}</h1>)}
            <div className="grid grid-cols-4 gap-4 w-10/12 mx-auto">
                {searchResult && searchResult.map((student, index) => (
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

export default Search;