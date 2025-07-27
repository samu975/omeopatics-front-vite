import { useNavigate } from "react-router-dom"



const NavBarOnlyGoBack = () => {
  const navigate = useNavigate()
  
  const handleGoBack = () => {
    navigate('/paciente/ver-test')
  }


  return (
    <button 
              onClick={handleGoBack}
              className="btn btn-ghost btn-sm"
            >
              ← Volver
            </button>
  )
}

export default NavBarOnlyGoBack