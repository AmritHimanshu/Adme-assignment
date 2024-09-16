import React from "react";
import Header from "./components/header";
import HeaderBanner from "./components/headerBanner";
import ImageContainer from "./components/imageContainer";

function App() {
  return (
    <div className="bg-cyan-50 min-h-[100vh]">
      <div className="sticky top-0 bg-slate-100 border-b-2 shadow-lg">
        <Header />
      </div>

      <HeaderBanner />

      <div className="p-10">
        <ImageContainer />
      </div>
    </div>
  );
}

export default App;
