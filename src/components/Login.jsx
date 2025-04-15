import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignIn , setIsSignIn] = useState(true);

    const toggleSignIn = () => {
        setIsSignIn(!isSignIn)
    }

  return (
    <div>
      <Header />
      {/* Background Image */}
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Form */}
      <form className="w-3/12 absolute p-12 bg-black bg-opacity-75 my-26 mx-auto right-0 left-0 text-white rounded-md opacity-90">
        <h1 className="text-3xl font-bold mb-6"> {isSignIn ? "Sign In" : "Sign Up"}</h1>
        {!isSignIn && <input
          type="Name"
          placeholder="Full Name"
          className="p-3 my-3 w-full bg-gray-800 rounded text-white"
        />}
        <input
          type="text"
          placeholder="Email or phone number"
          className="p-3 my-3 w-full bg-gray-800 rounded text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-3 w-full bg-gray-800 rounded text-white"
        />
        <button className="p-3 my-6 bg-red-600 w-full rounded hover:bg-red-700 cursor-pointer font-semibold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {/* Options */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>

        {/* Signup */}
        <p className="text-sm text-gray-400 mb-1"  onClick={(toggleSignIn)}>
          {isSignIn ? "New to Netflix? " : "Already Registered?"} <span className="text-white hover:underline cursor-pointer font-bold">{isSignIn ? "Sign up now." : "Sign In"}</span>
        </p>

        {/* reCAPTCHA */}
        <p className="text-xs text-gray-500">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <span className="text-blue-500 hover:underline cursor-pointer"> Learn more.</span>
        </p>
      </form>
    </div>
  )
}

export default Login
