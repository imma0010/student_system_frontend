// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Search from "./pages/Search"
import AddStudent from "./pages/AddStudent"
import StudentDetail from "./pages/StudentDetails"
import EditStudent from "./pages/EditStudent"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />}/>
          <Route path="search" element={<Search />}/>
          <Route path="add-student" element={<AddStudent />}/>
          <Route path="student/:id" element={<StudentDetail />}/>
          <Route path="student/edit/:id" element={<EditStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
