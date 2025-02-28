import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/custom/protected-route/ProtectedRoute';
import Dashboard from './components/custom/dashboard/Dashboard';
import AddBook from './components/custom/add-book/AddBook';
import IssueBook from './components/custom/issue-book/IssueBook';
import ReturnBook from './components/custom/return-book/ReturnBook';
import StudentAnalytics from './components/custom/student-analytics/StudentAnalytics';
import Chart from './components/custom/chart/Chart';
import Header from './components/custom/header/Header';
import Login from './components/custom/login/Login';
import Register from './components/custom/register/Register';
import Student from './components/custom/student/Student';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addBook" element={<AddBook />} />
            <Route path="/student" element={<Student />} />
            <Route path="/issueBook" element={<IssueBook />} />
            <Route path="/returnBook" element={<ReturnBook />} />
            <Route path="/analytics" element={<StudentAnalytics />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Route>
        </Routes>
  </BrowserRouter>
  );
}

export default App;