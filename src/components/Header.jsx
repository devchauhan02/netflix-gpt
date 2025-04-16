import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        navigate('/error');
      });
  };

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
    <div className="absolute w-screen px-12 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-30"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />
      {user && (
        <div
          className="relative flex items-center gap-2 cursor-pointer select-none"
          ref={dropdownRef}
          onClick={() => setOpen((prev) => !prev)}
        >
          <img className="w-8 h-8 rounded-sm" src={user?.photoURL} alt="Profile" />
          <ChevronDown className={`text-white h-5 w-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          {open && (
            <div className="absolute right-0 top-12 w-60 bg-black text-white rounded-md shadow-lg py-2 z-20">
              <div className="flex flex-col border-b border-gray-700 text-sm">
                {[
                  { name: 'muskan', img: 'https://i.imgur.com/N7rlQYt.png' },
                  { name: 'home', img: 'https://i.imgur.com/f1QHN3q.png' },
                  { name: 'shantanu', img: 'https://i.imgur.com/LkT8JXW.png' },
                  { name: 'Children', img: 'https://i.imgur.com/4KaYNDx.png' },
                ].map((profile, idx) => (
                  <div key={idx} className="flex items-center px-4 py-2 hover:bg-gray-700">
                    <img className="w-8 h-8 rounded-sm mr-3" src={profile.img} alt={profile.name} />
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
              <div className="px-15 py-2 hover:bg-gray-700 cursor-pointer text-sm" onClick={handleSignOut}>
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
