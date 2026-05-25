import { Routes, Route } from 'react-router-dom'

// Landing page components
import LandingPage from './pages/LandingPage'

// Onboarding & auth pages
import AccountType from './pages/AccountType'
import Step1Phone from './pages/Step1Phone'
import Step2OTP from './pages/Step2OTP'
import Step3WorkPath from './pages/Step3WorkPath'
import Step4Profile from './pages/Step4Profile'
import Step5Success from './pages/Step5Success'
import LoginPhone from './pages/LoginPhone'
import LoginOTP from './pages/LoginOTP'
import FindTasks from './pages/FindTasks'
import TaskDetail from './pages/TaskDetail'


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* volunteer & worker sign-up */}
      <Route path="/onboarding" element={<AccountType />} />
      <Route path="/onboarding/phone" element={<Step1Phone />} />
      <Route path="/onboarding/verify" element={<Step2OTP />} />
      <Route path="/onboarding/path" element={<Step3WorkPath />} />
      <Route path="/onboarding/profile" element={<Step4Profile />} />
      <Route path="/onboarding/success" element={<Step5Success />} />

      {/* volunteer login */}
      <Route path="/login" element={<LoginPhone />} />
      <Route path="/login/verify" element={<LoginOTP />} />

      {/* worker login */}
      <Route path="/signin" element={<LoginPhone />} />
      <Route path="/signin/verify" element={<LoginOTP />} />

      {/* main app */}
      <Route path="/find-tasks" element={<FindTasks />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
    </Routes>
  )
}

export default App
