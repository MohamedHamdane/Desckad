// import './App.css';
// // import Header from './Comp/Navbar/Header';
// import Navbar from './Comp/Navbar/Navbar';

// function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Navbar from './Comp/Navbar/Navbar';
import './App.css';
import Landing from './Comp/Landing/Landing';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    }
  };

  return (
    <div className="App">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Landing/>
    </div>
  );
}

export default App;
