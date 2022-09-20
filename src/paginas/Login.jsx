import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})
    
    //setea/configura la autenticancion del usuario
    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            });
            
                return
            }

            try {
                // guardamos en nuestra data el objeto que vendra de la base de datos junto al token
                const {data} = await clienteAxios.post('/veterinarios/login', {email, password})
                console.log(data)
                localStorage.setItem('token', data.token)
                // guardamos la data en el hook para posteriormente ser usado y redigirido con el navigate
                // recuerda que la data tiene el token que nos da acceso a la informacion
                setAuth(data)
                navigate('/admin')
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg, 
                    error:true
                })
            }
        }

    const {msg} = alerta
    return (
    <>
        
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Iniciar sesion y administra tus {""}<span className="text-black"> Pacientes</span></h1>

            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta 
                alerta={alerta}
                />}

                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input 
                            type="email"
                            placeholder="Email de Registro" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            defaultValue={email} 
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="my-5">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                        <input 
                            type="password"
                            placeholder="Tu password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            defaultValue={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <input 
                        type="submit" 
                        defaultValue="Iniciar Sesion"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer text-center hover:bg-indigo-800 md:w-auto" />
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/registrar" 
                    className='block text-center my-5 text-gray-500'>¿No tienes una cuenta?, regístrate</Link>
                    <Link to="/olvide-password" 
                    className='block text-center my-5 text-gray-500'> Olvide mi password</Link>
                    
                </nav>
            </div>
    </>
  )
}

export default Login