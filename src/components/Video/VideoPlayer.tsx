import demoVideo from "../../assets/demoVideo.gif";
const VideoPlayer = () => {
  return (
    <div className="w-full max-w-md mx-auto my-4 shadow-xs shadow-text-white rounded-lg">
      <img src={demoVideo} alt="Demo Video" className="w-full" />
    </div>
  );
};

export default VideoPlayer;
