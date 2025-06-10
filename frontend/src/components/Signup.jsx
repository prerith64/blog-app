import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const { Signup:SignupUser, authError } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    await SignupUser(formData);

    if (!authError) {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen w-full absolute top-0 flex items-center justify-center opacity-80 bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg bg-white flex flex-col gap-8 w-full p-8 rounded-xl">
        <div>
          <h2 className=" text-center text-2xl font-extrabold text-gray-900">
            Create your account
          </h2>
           <p className='text-lg mt-1 text-center text-gray-900 opacity-80'>Welcome back! Please log in to continue </p>
        </div>
        <form className="flex flex-col text-lg gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div>
              <label htmlFor="name" className="text-gray-900 font-semibold">
                Full Name
              </label>
              <input
                id="name"
                name="username"
                type="text"
                required
                className="appearance-none rounded-xl relative mt-1 block w-full px-4 py-2  border-gray-400 border-1 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 focus:z-10 "
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-900 font-semibold">
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
              <label htmlFor="password" className="text-gray-900 font-semibold">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-xl relative mt-1 block w-full px-4 py-2  border-gray-400 border-1 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 focus:z-10 "
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-gray-900 font-semibold">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-xl relative mt-1 block w-full px-4 py-2  border-gray-400 border-1 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:ring-1 focus:border-indigo-500 focus:z-10 "
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {authError && (
            <div className="text-red-500 text-sm text-center">{authError}</div>
          )}

          <div>
            <button
              type="submit"
              className="group rounded-xl relative w-full flex justify-center px-4 py-2  border border-transparent font-bold  text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
             <p className='text-gray-900 opacity-80 mt-1 text-center'>Already have an account? <a href='/login' className='font-semibold cursor-pointer'>login</a></p>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup