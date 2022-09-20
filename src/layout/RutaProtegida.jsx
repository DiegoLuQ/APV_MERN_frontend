// Dependencias
import { Outlet, Navigate } from "react-router-dom"
// Componentes
import Footer from "../components/Footer"
import Header from "../components/Header"
import useAtuh from "../hooks/useAuth"

function RutaProtegida() {

    const {auth, cargando} = useAtuh()
    // console.log(auth)
    // console.log(cargando)
    if (cargando) return ' cargando ...'
    
  return (
    <>
        <Header/>

        {/* revisa que auth tenga algun atriobuto en este caso id */}
        {auth?._id ? (
            <main className="container mx-auto mt-10">
                <Outlet/>
            </main>
        ) : <Navigate to='/' />}
        <Footer/>
    </>
  )
}

export default RutaProtegida