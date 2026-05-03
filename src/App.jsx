import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import MyTasks from './pages/MyTasks'
import OrgRegister from './pages/OrgRegister'

function PrivateRoute({ children }) {
  return localStorage.getItem('gg_access') ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/org-register" element={<OrgRegister />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
      <Route path="/dashboard/my-tasks" element={<PrivateRoute><MyTasks /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
