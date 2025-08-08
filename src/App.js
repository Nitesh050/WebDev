import React from "react";
import VantaBg from "./components/VantaBg";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <VantaBg />
      </div>
      <Navbar />
      <Landing />
      <Footer />
    </div>
  );
}

export default App;
