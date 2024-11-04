import React from "react";
import PsychologistChat from "./components/PsychologistChat";

const Home = () => {
  return (
    <div className="home-page">
      <PsychologistChat />
      <style jsx>{`
        .home-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Home;
