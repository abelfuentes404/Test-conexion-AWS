import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function Dashboard() {
  const { user, loading } = useAuth()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers()
    }
  }, [user])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/auth/users')
      setUsers(response.data.users)
    } catch (err) {
      setError('Error cargando usuarios')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="w-full max-w-6xl animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white text-shadow mb-2">
            Dashboard
          </h1>
          <p className="text-white/80">Panel de control del sistema</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse-slow"></span>
          <span className="font-medium">Conectado a AWS RDS</span>
        </div>
      </div>

      {/* Grid de Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Tarjeta de Usuario */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">👤</span>
            Información del Usuario
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">ID</span>
              <span className="font-mono font-medium text-gray-800">#{user.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Usuario</span>
              <span className="font-medium text-gray-800">{user.username}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-gray-800">{user.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Rol</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                user.role === 'admin' 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Tarjeta de Conexión */}
        <div className="glass rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">🗄️</span>
            Estado de Conexión
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Base de Datos</span>
              <span className="font-medium text-green-600">PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Proveedor</span>
              <span className="font-medium text-gray-800">AWS RDS</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Estado</span>
              <span className="flex items-center gap-2 font-medium text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Activo
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Latencia</span>
              <span className="font-medium text-gray-800">&lt; 50ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel de Admin */}
      {user.role === 'admin' && (
        <div className="glass rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">⚡</span>
            Panel de Administrador
          </h3>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Usuario</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Rol</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-700">Registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr 
                    key={u.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      index % 2 === 0 ? 'bg-white/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-sm text-gray-600">#{u.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{u.username}</td>
                    <td className="py-3 px-4 text-gray-600">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        u.role === 'admin' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(u.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Panel de Usuario Normal */}
      {user.role === 'user' && (
        <div className="glass rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            ¡Bienvenido, {user.username}! 🎉
          </h3>
          <p className="text-gray-600 mb-6">
            Has iniciado sesión exitosamente usando la base de datos PostgreSQL alojada en AWS RDS.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🔐', title: 'Autenticación JWT', desc: 'Tokens seguros' },
              { icon: '👥', title: 'Roles de Usuario', desc: 'Admin y User' },
              { icon: '☁️', title: 'AWS RDS', desc: 'Base de datos en la nube' },
              { icon: '🔒', title: 'Bcrypt', desc: 'Contraseñas encriptadas' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/80 transition-colors"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard