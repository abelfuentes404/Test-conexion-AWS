import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors"
        >
          AWS RDS Demo
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-600 font-medium hidden sm:block">
                {user.username} 
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  user.role === 'admin' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {user.role}
                </span>
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <Link 
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-primary font-semibold transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
              >
                Registro
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar