import { useParams, Link } from "react-router-dom" // usar los parametros de la url /:id
import { useEffect, useState } from "react"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"

function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false) // por defecto la cuenta no esta confirmada FALSE
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})
  const params = useParams()
  const {id} = params
  

  //useEffect es un callback
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`
        const {data} = await clienteAxios(url)

        //cuando creamos la cuenta, cuando le damos al boton registrar
        setCuentaConfirmada(true)
        setAlerta({
          msg:data.msg
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, 
          error:true})
      }

      setCargando(false)
    }
    confirmarCuenta()
  }, [])


    return (
<>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza Administrar {""}<span className="text-black"> tus Pacientes</span></h1>

      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* cuando cargando este como false mostramos la alerta, recuerda que CARGANDO esta como true por default */}
        {!cargando && 
        <Alerta
        alerta={alerta}
      />}
        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to='/'>¿Ya tienes una cuenta? Inicio Sesión</Link>
        )}
      </div>
    </>
    )
  }
  
  export default ConfirmarCuenta