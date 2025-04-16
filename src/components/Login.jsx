import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errors, setErrors] = useState({ email: null, password: null, api: null });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignIn = () => setIsSignIn(!isSignIn);

  const handleButtonClick = async () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    const validationResult = checkValidateData(emailVal, passwordVal);
    const emailError = validationResult === 'Email is not valid' ? validationResult : null;
    const passwordError = validationResult === 'Password is not valid' ? validationResult : null;

    setErrors({ email: emailError, password: passwordError, api: null });

    if (emailError || passwordError) return;

    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, emailVal, passwordVal);
        navigate('/browse');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

        await updateProfile(userCredential.user, {
          displayName: name.current.value,
          photoURL:
            'https://occ-0-3647-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea',
        });

        await auth.currentUser.reload(); // ensure updated user info is fetched

        const updatedUser = auth.currentUser;
        dispatch(
          addUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
          })
        );

        navigate('/browse');
      }
    } catch (error) {
      console.error('Firebase Error:', error);
      setErrors({ email: null, password: null, api: 'Invalid Email or Password' });
    }
  };

  return (
    <div>
      <Header />

      {/* Background */}
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black bg-opacity-75 my-26 mx-auto right-0 left-0 text-white rounded-md opacity-90"
      >
        <h1 className="text-3xl font-bold mb-6">{isSignIn ? 'Sign In' : 'Sign Up'}</h1>

        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3 w-full bg-gray-800 rounded text-white"
          />
        )}

        {/* Email */}
        <div className="relative">
          <input
            ref={email}
            type="text"
            placeholder="Email or phone number"
            className="p-3 my-3 w-full bg-gray-800 rounded text-white"
          />
          {errors.email && (
            <p className="text-red-600 text-sm font-semibold ml-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            ref={password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="p-3 my-3 w-full bg-gray-800 rounded text-white pr-10"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm font-semibold ml-1">{errors.password}</p>
          )}
        </div>

        {errors.api && (
          <p className="text-red-600 text-sm font-semibold ml-1">{errors.api}</p>
        )}

        {/* Submit */}
        <button
          className="p-3 my-6 bg-red-600 w-full rounded hover:bg-red-700 cursor-pointer font-semibold"
          onClick={handleButtonClick}
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>

        <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>

        <p className="text-sm text-gray-400 mb-1" onClick={toggleSignIn}>
          {isSignIn ? 'New to Netflix?' : 'Already Registered?'}
          <span className="text-white hover:underline cursor-pointer font-bold px-1.5">
            {isSignIn ? 'Sign up now.' : 'Sign In'}
          </span>
        </p>

        <p className="text-xs text-gray-500">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <span className="text-blue-500 hover:underline cursor-pointer"> Learn more.</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
