
import styles from './Notfound.module.css'
import logo from '../../assets/images/error.svg'
export default function Notfound() {
  return (
    <>
    <div className='flex justify-center items-center ' >
      <img src={logo} alt="error logo " width={700} />
    </div>
    </>

  )
}
