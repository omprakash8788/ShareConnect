import video from "../assets/medium.mp4";
const Home = () => {
  return (
    <div className="w-[60%] items-center mx-auto flex justify-between">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
