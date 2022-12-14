import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

function Registrar() {

  //generamos los state para guardarlos en el hook,
  // cada elemento de la lista representa algo, [valor, funcion que modifica el state] en este caso la funcion en onChange
  const [nombre, setNombre] = useState('') // para inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setrepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({}) // sera un objeto vacio

  const handleSubmit = async e => {
    e.preventDefault()
    
    if([nombre, email,password,repetirPassword].includes('')){
      setAlerta({msg:'Hay Campoos Vacios', error: true})
      return;
    }
    if(password !== repetirPassword){
      setAlerta({msg:'Los password no son iguales', error: true})
      return
    }
    if(password.length < 6){
      setAlerta({msg:'El Password es muy corto, agregar minimo 6 caracteres', error: true})
      return
    }
    setAlerta({})
    // Crear el usuario en la Api
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password})
      setAlerta({
        msg:'Creado Correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error: true})
    }
  }
  // destructuring
  // si en el mensaje existe algo(un true) generacion el objeto alerta
  const {msg} = alerta


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra<span className="text-black"> tus Pacientes</span></h1>

      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {/* // si en el mensaje existe algo(un true) generacion el objeto alerta */}
        {msg && <Alerta 
          alerta={alerta}
        />}

        <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                <input 
                    type="text"
                    placeholder="Tu nombre" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    defaultValue={nombre}
                    onChange={e => setNombre(e.target.value)}/>
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input 
                    type="email"
                    placeholder="Tu email" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                <input 
                    type="password"
                    placeholder="Tu password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
                <input 
                    type="password"
                    placeholder="Repeti tu password" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={repetirPassword}
                    onChange={e => setrepetirPassword(e.target.value)}/>
            </div>
            <input 
                      type="submit" 
                      value="Crear Cuenta"
                      className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer text-center hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
                  <Link to="/" 
                  className='block text-center my-5 text-gray-500'>??Ya tienes una cuenta? Inicia Sesi??n</Link>
                  <Link to="/olvide-password" 
                  className='block text-center my-5 text-gray-500'> Olvide mi password</Link>
                  
              </nav>
      </div>
    </>
  )
  }
  
  export default Registrar