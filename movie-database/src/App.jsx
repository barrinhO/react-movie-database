import React from "react";
import APIOMDB from "./components/ApiOMDB.jsx";

function App() {
  return (
    <>
      <div>
        <h1 className="bg-black text-white">Movie Database</h1>
        <APIOMDB />
      </div>
    </>
  );
}

export default App;
