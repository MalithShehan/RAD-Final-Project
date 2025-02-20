import React, { useState } from "react";

const AddStudent = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        studentId: "",
        city: "",
        phone: "",
        studentClass: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Student Data Submitted:", formData);
        // Add your logic to save data to API or state here
        alert("Student added successfully!");
        setFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            studentId: "",
            city: "",
            phone: "",
            studentClass: "",
        });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Add Student</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Middle Name */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="middleName">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Student ID */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="studentId">
                            Student ID
                        </label>
                        <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-medium mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Class */}
                    <div className="md:col-span-2">
                        <label className="block font-medium mb-2" htmlFor="studentClass">
                            Class
                        </label>
                        <input
                            type="text"
                            id="studentClass"
                            name="studentClass"
                            value={formData.studentClass}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary"
                    >
                        Add Student
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudent;
