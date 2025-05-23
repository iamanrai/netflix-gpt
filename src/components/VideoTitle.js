const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black ">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-md hover:bg-opacity-80 ">
          ▶ Play
        </button>
        <button className="bg-white text-black p-4 px-12 text-xl rounded-md mx-3 hover:bg-opacity-80">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
