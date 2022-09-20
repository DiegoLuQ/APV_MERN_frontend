import { useState, useEffect, createContext } from "react";
import clienteAxios from '../config/axios' 

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    // se agrego esta linea por que en la url /admin, al iniciar sesion nos redireccionaba al inicio ya que, a la primera carga
    // no obteniamos nada y nos mandaba al inicio(login)
    const [ cargando, setCargando] = useState(true)

    const [ auth, setAuth] = useState({}) 

    useEffect(() => {
        const autenticarUsuario = async () => {
            //obtener el token del localstorage
            const token = localStorage.getItem('token')

            //sino hay un token -  return
            if(!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                                    // ira primero a la URL y por ultimo a la configuracion 
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSession = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        //obtener el token del localstorage
        const token = localStorage.getItem('token')

        //sino hay un token -  return
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            // console.log(data)
            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        
        //obtener el token del localstorage
        const token = localStorage.getItem('token')

        //sino hay un token -  return
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data)
            return {msg: data.msg}
        } catch (error) {
            return {
                msg:error.response.data.msg,
                error:true
            }
        }
    }


    return(
        <AuthContext.Provider
        //podemos pasar un objeto, y tomamos los state auth y setAuth
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSession,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}  {/* engloba los componentes que estan dentro de AuthProvider */}

        </AuthContext.Provider>
    )



}


export {
    AuthProvider
}

export default AuthContext