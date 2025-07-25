import GoBack from './GoBack'
import GoHome from './GoHome'

const NavBar = () => {
  return (
    <div className='flex justify-between items-center px-8 py-4 w-full md:px-16 md:py-8'>
      <GoBack />
      <GoHome /> 
    </div>
  )
}

export default NavBar