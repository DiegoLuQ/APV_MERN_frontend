import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

// useContext sirve para extrar los datos del context
// authContext tienes que identificar que context debe extraer los datos

const usePacientes = () => {
    return useContext(PacientesContext)
}


export default usePacientes