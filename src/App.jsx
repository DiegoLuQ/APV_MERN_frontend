import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RutaProtegida from './layout/RutaProtegida'
import AuthLayout from './layout/AuthLayout'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPasssword from './paginas/CambiarPassword'
import AdministrarPaciente from './paginas/AdministrarPaciente'


import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
// BrowserRouter - agrupa todas las etiquetas las cuales comteplan en su interior las rutas y componentes
// Routes - agrupa diferentes rutas
// Route - ruta en especifico

function App() {
  
  return (

  <BrowserRouter>
    <AuthProvider> {/* engloba todos los componentes */}
      <PacientesProvider>
        <Routes>
          {/* Area Publica */}
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} /> {/* utilizamos index junto a Outlet para unir al padre e hijos  */}
            <Route path='registrar' element={<Registrar />} />
            <Route path='olvide-password/:token' element={<NuevoPassword />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
          </Route>
          {/* Area Privada */}
          <Route path='/admin' element={<RutaProtegida/>}>
            <Route index element={<AdministrarPaciente/>} />
            <Route path="perfil" element={<EditarPerfil/>} />
            <Route path="cambiar-password" element={<CambiarPasssword/>} />
            
          </Route>
        </Routes>
      </PacientesProvider>

    </AuthProvider>
  </BrowserRouter>  
  )
    
}

export default App
