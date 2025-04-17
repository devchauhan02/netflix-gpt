const VideoTitle = ({ title, overview }) => {
  return (
    <div className="overflow-x-hidden w-screen aspect-video pt-[20%] px-6 md:px-13 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold pb-3">{title}</h1>
      <p className="hidden md:inline-block py-6 w-1/4 text-sm">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:opacity-80 cursor-pointer">
          Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 hover:opacity-90 rounded-lg cursor-pointer">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;