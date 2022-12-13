import React from 'react';
import CaloriesForm from "./components/CaloriesForm/CaloriesForm";
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";

function App() {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
          <Route path="/meals/new" element={(
            <CaloriesForm/>
          )}/>
          <Route path="/edit/meal" element={(
            <CaloriesForm/>
          )}/>
          <Route path="*" element={(
            <h1>Not found!</h1>
          )}/>
        </Routes>

      </main>
    </div>
  );
}

export default App;
