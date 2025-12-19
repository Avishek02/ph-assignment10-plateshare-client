import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import Lottie from 'lottie-react'
import loadingAnimation from '../assets/loading.json'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-64">
          <Lottie animationData={loadingAnimation} loop />
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
