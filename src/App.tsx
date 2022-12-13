import React from 'react';
import CaloriesForm from "./components/CaloriesForm/CaloriesForm";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <main>
        <CaloriesForm/>
      </main>
    </div>
  );
}

export default App;
