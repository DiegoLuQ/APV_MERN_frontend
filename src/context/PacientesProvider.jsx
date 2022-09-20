import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios"

const PacientesContext = createContext()
export const PacientesProvider =  ({children}) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                
                if(!token) return //sino hay un token

                const config = {
                    headers:{ 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    }, [])


    const guardarPaciente = async (paciente) => {
        // console.log(paciente)
        const token = localStorage.getItem('token')
        const config = {
            headers:{ 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                // console.log(data)
                const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
    
                // hacemos un destructuring, quitamos los datos de la izquierda y obtenemos solo los datos
                // que se guardaran en la dferecha
                const {createAt, updatedAt, __v, ... pacienteAlmacenado} = data
                console.log(pacienteAlmacenado)
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error)
            }
        }
        // console.log(paciente)
        
        
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }
    const eliminarPaciente = async id => {
        const confirmar = confirm('Deseas eliminar el paciente?')
        
        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers:{ 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}>
            {children}
        </PacientesContext.Provider>
    )

}


export default PacientesContext;