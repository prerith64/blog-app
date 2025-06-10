import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { isAuthenticated, Logout } = useAuth()

  const activeClass = 'border-b-4 border-purple-600'
  return (
    <header className='w-full bg-white shadow font-semibold text-xl z-2 mb-16'>
      <nav className='m-auto container flex py-4 items-center justify-between'>
        <h1 className='text-3xl font-extrabold text-purple-800 italic'>
          Plese
        </h1>
        <ul className='flex gap-4 '>
          <li>
            <NavLink to="/"
              className={({ isActive }) => isActive ? activeClass : ""} >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/myblogs"
              className={({ isActive }) => isActive ? activeClass : ""} >
              My Blogs
            </NavLink>
          </li>
        </ul>
        <div>
          {!isAuthenticated ? (
            <>
              <button onClick={() => navigate('/login')} className= 'bg-purple-600 text-white px-4 py-2 rounded-md mx-2'>Login</button>
              <button onClick={() => navigate('/signup')} className='bg-purple-600 text-white px-4 py-2 rounded-md mx-2'>Signup</button>
            </>
          ) : (
            <button
              onClick={async() => {
               await Logout()
                navigate('/login')
              }}
              className='bg-red-600 text-white px-4 py-2 rounded-md mx-2'
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar