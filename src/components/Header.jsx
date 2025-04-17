import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import {Profile} from "../utils/Profile"

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).catch(() => {
      navigate('/error');
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-x-hidden absolute w-screen px-12 py-2 bg-gradient-to-b from-black z-20 flex justify-between items-center">
      <img className="w-30" src={LOGO} alt="Netflix Logo" />
      {user && (
        <div
          className="relative flex items-center gap-2 cursor-pointer select-none"
          ref={dropdownRef}
          onClick={() => setOpen((prev) => !prev)}
        >
          <img className="w-8 h-8 rounded-sm" src={user?.photoURL} alt="Profile" />
          <ChevronDown
            className={`text-white h-5 w-5 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
          {open && (
            <div className="overflow-x-hidden absolute right-0 top-12 w-60 bg-black text-white rounded-md shadow-lg py-2 z-20">
              <div className="flex flex-col border-b border-gray-700 text-sm">
                {Profile.map((profile, idx) => (
                  <div
                    key={idx}
                    className="flex items-center px-4 py-2 hover:bg-gray-700"
                  >
                    <img
                      className="w-8 h-8 rounded-sm mr-3"
                      src={profile.img}
                      alt={profile.name}
                    />
                    <span>{profile.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col border-b border-gray-700 text-sm">
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Manage Profiles</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Transfer Profile</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Account</div>
                <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Help Centre</div>
              </div>
              <div
                className="px-15 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                onClick={handleSignOut}
              >
                Sign out of Netflix
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
