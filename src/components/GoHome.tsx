import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

const GoHome = () => {
  return (
    <Link to='/'>
      <FaHome className='w-6 h-6' />
    </Link>
  )
}

export default GoHome