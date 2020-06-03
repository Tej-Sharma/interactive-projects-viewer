import React from "react";
import logo from "./logo.svg";

// Components
import PageNavbar from "./components/navbar/PageNavbar";
import MainPage from "./components/main_page/MainPage";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <PageNavbar />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
