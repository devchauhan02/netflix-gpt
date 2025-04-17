import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const profiles = [
  { name: 'Muskan', img:  'https://64.media.tumblr.com/8e881a0a1cb89fb4e52d9c16a79e300b/6baf838c96f16c37-90/s500x750/114d9a08ad11c32a827659c391930e0b11af78b1.jpg'},
  { name: 'Shantanu', img: 'https://images-platform.99static.com/TtM8c8zJCSYBVmNxFUXYlwXjGLs=/0x0:960x960/500x500/top/smart/99designs-contests-attachments/72/72351/attachment_72351193' },
  { name: 'Corpse', img: 'https://avatarfiles.alphacoders.com/344/thumb-1920-344695.png' },
  { name: 'Children', img: 'https://i.pinimg.com/736x/eb/29/18/eb29182218ee8eb5375f6b7339964a7a.jpg' },
];

const ProfileSelection = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleProfileClick = () => {
    navigate('/browse');
  };

  return (
    <div className="flex flex-col h-screen items-center pt-30 gap-7 bg-black text-white">
      <h1 className="text-4xl mb-10">Who's watching?</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-15 font-semibold">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            onClick={handleProfileClick}
            className="cursor-pointer text-center"
          >
            <img
              src={profile.img}
              alt={profile.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-md hover:border-4 hover:border-white"
            />
            <p className="mt-2">{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelection;
