import { Link } from "react-router-dom"

function AdminNav() {
  return (
    <nav className="flex gap-3">
        <Link
        to="/admin/perfil"
        className="font-bold uppercase text-gray-500 hover:text-indigo-700">        
        Perfil</Link>
        <Link
        to="/admin/cambiar-password"
        className="font-bold uppercase text-gray-500 hover:text-indigo-700">        
        Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav