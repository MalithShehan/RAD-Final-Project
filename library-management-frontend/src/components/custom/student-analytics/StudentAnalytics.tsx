import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentAnalytics = () => {
    const [studentId, setStudentId] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleGetAnalytics = () => {
        if (!studentId) {
            alert("Please enter a student ID!");
            return;
        }

        // Fetch analytics (mock function for now)
        alert(`Fetching analytics for Student ID: ${studentId} from ${startDate.toDateString()} to ${endDate.toDateString()}`);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Student Analytics</h1>

            {/* Search Student ID */}
            <div className="mb-4">
                <label htmlFor="studentId" className="block font-medium mb-2">Enter Student ID</label>
                <input
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID to search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Date Range Picker */}
            <div className="mb-4">
                <label className="block font-medium mb-2">Select Date Range</label>
                <div className="flex gap-4">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Get Analytics Button */}
            <div className="text-center">
                <button
                    onClick={handleGetAnalytics}
                    className="w-full px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500"
                >
                    Get Analytics
                </button>
            </div>
        </div>
    );
};

export default StudentAnalytics;
