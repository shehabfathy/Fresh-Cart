import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <>
    <NavBar/>
    <div className='paddingX min-h-screen '>
    <Outlet/>
    </div>
    <Toaster />
    <Footer/>
    </>
  )
}
