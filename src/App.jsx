import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import AvailableFoods from './pages/AvailableFoods.jsx'
import FoodDetails from './pages/FoodDetails.jsx'
import AddFood from './pages/AddFood.jsx'
import ManageFoods from './pages/ManageFoods.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import MyRequests from './pages/MyRequests.jsx'
import DonorRequests from './pages/DonorRequests.jsx'
import UpdateFood from './pages/UpdateFood.jsx'
import Footer from './components/Footer.jsx'
import { Toaster } from 'react-hot-toast'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'





function App() {
  return (
    <div className='app-root min-h-screen flex flex-col'>
      <Navbar />


      <main className='flex-1'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/foods' element={<AvailableFoods />} />

          {/* Footer routes  */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />


          <Route
            path='/food/:id'
            element={
              <ProtectedRoute>
                <FoodDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/add-food'
            element={
              <ProtectedRoute>
                <AddFood />
              </ProtectedRoute>
            }
          />
          <Route
            path='/manage-foods'
            element={
              <ProtectedRoute>
                <ManageFoods />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-requests'
            element={
              <ProtectedRoute>
                <MyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path='/donor-requests'
            element={
              <ProtectedRoute>
                <DonorRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path='/update-food/:id'
            element={
              <ProtectedRoute>
                <UpdateFood />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>


      <Toaster position="top-center" />

      <Footer />

    </div>
  )
}

export default App
