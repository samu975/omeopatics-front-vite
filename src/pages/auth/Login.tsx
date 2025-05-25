import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/auth/login`, {
        cedula,
        password
      });
      console.log(response);
      if (response.data.status === 200) {
        localStorage.setItem('token', response.data.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('role', response.data.data.user.role);
        
        toast.success('¡Inicio de sesión exitoso!');
        
        switch (response.data.data.user.role ) {
          case 'admin':
            navigate('/doctor/dashboard');
            break;
          case 'user':
            navigate('/patient/dashboard');
            break;
          case 'doctor':
            navigate('/doctor/dashboard');
            break;
          default:
            toast.error('Rol no reconocido');
            break;
        }
      } 
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'Error al iniciar sesión');
      }
    }
  };

  return (
    <>
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 '>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className='flex flex-col card p-4 md:p-8 lg:p-12 shadow-lg bg-base-100 lg:w-1/4'>
          <div className='flex flex-col gap-3 my-4'>
            <label htmlFor="cedula" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Cedula</label>
            <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} className='input input-bordered w-full lg:text-xl' />
          </div>
          <div className='flex flex-col gap-3 my-4'>
            <label htmlFor="password" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input input-bordered w-full lg:text-xl' />
          </div>
            <button type="submit" className='btn btn-primary lg:text-xl'>Iniciar sesión</button>
        </form>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    </>
  )
}

export default Login