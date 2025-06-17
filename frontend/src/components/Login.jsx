import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { Login, authError } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Login(formData.email, formData.password)
    if (!authError) {
      navigate('/')
      window.location.reload();

    }
  }

  return (
    <div className="min-h-screen flex absolute m-0 p-0 border-0 opacity-80 bg-black    visible inset-1  items-center  justify-center   ">
      <div className="  flex flex-col bg-white rounded-xl gap-8  max-w-md w-full p-8 shadow ">
        <div className='text-center'>
          <h2 className=" text-center text-2xl font-extrabold text-gray-900">
             Log in
          </h2>
          <p className='text-lg mt-1 text-gray-900 opacity-80'>Welcome back! Please log in to continue </p>
        </div>
        <form className="flex flex-col text-lg gap-8" onSubmit={handleSubmit}>
          
            <div>
              <label htmlFor="email" className='text-gray-900 font-semibold'>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-xl relative mt-1 block w-full px-4 py-2  border-gray-400 border-1 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 focus:z-10 "
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              
              <label htmlFor="password" className='text-gray-900 font-semibold'  >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-xl relative block mt-1 w-full px-4 py-2    border-gray-400 border-1 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          

          {authError && (
            <div className="text-red-500 text-sm text-center">{authError}</div>
          )}

          <div>
            <button
              type="submit"
              className="group rounded-xl relative w-full flex justify-center px-4 py-2  border border-transparent font-bold  text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
            <p className='text-gray-900 opacity-80 mt-1 text-center'>Don't have an account? <a href='/signup' className='font-semibold cursor-pointer'>Signup</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login