import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/auth/login`, {
        cedula,
        password
      });
      if (response.data.status === 200) {
        localStorage.setItem('token', response.data.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('role', response.data.data.user.role);
        
        toast.success('¡Inicio de sesión exitoso!');
        
        switch (response.data.data.user.role ) {
          case 'admin':
            navigate('/doctor/dashboard');
            break;
          case 'patient':
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
        <form onSubmit={handleSubmit} className='flex flex-col card p-4 md:p-8 lg:p-12 shadow-lg bg-base-100 lg:w-1/4 w-5/6'>
          <div className='flex flex-col gap-3 my-4'>
            <label htmlFor="cedula" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Cedula</label>
            <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} className='input input-bordered w-full lg:text-xl' />
          </div>
          <div className='flex flex-col gap-3 my-4'>
            <label htmlFor="password" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Contraseña</label>
            <div className="relative">
    <input 
      type={showPassword ? "text" : "password"} 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      className='input input-bordered w-full lg:text-xl pr-12' 
      autoComplete="current-password"
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3 hover:opacity-70 transition-opacity password-eye-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        // Icono ojo cerrado
        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      ) : (
        // Icono ojo abierto
        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.066 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  </div>
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