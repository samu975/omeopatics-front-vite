import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
const GoBack = () => {
  const navigate = useNavigate()

  return (
    <button className="btn btn-ghost btn-circle" onClick={() => navigate(-1)}>
      <GoArrowLeft className="w-6 h-6" />
    </button>
  )
}

export default GoBack