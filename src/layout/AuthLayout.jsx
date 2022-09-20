// rafce - permite crear un componente


import {Outlet} from 'react-router-dom' //outlet nos permite juntar componente hijos, en este caso 
// AuthLayout es el padre 

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-2 gap-10 p-5 items-center">
            <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout