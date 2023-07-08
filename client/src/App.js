import React, { useEffect, useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';


function App() {
  // const [ managers, setManagers ] = useState([]);

  // useEffect(() => {
  //   fetch("/managerData").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setManagers(data)
  //     }
  //   )
  // }, [])

  return (
    <>
      <BrowserRouter>
        <LandingPage/>
      </BrowserRouter>
    </>
  )
}

export default App