import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { UserContext } from './UserContext';
import Header from './components/Header';
import StandingsPage from './pages/StandingsPage';
const { qpl23, oldData } = require('./constants');

const useLocalStorageState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [userId, setUserId] = useLocalStorageState('userId', 5168169);
  const [managerObj, setManagerObj] = useLocalStorageState('managerObj', {
    manager_name: 'Stephen Thomas',
    team_name: 'GS11',
    qpl_rank: 7,
    overall_rank: 536189,
    total_pts: 2427,
    chips_used: [
      { name: 'wildcard', time: '2022-09-07T04:20:03.738868Z', event: 8 },
      { name: 'freehit', time: '2023-01-02T10:19:53.270204Z', event: 19 },
      { name: '3xc', time: '2023-02-03T16:52:21.828651Z', event: 22 },
      { name: 'wildcard', time: '2023-03-14T10:10:39.155112Z', event: 28 },
      { name: 'bboost', time: '2023-04-29T09:29:40.008510Z', event: 34 }
    ],
    last_gw_rank: 4324165,
    team_value: 1002,
  });
  const [currentGW, setCurrentGW] = useState(38);
  const [signedIn, setSignedIn] = useLocalStorageState('signedIn', false);

  const setUserIdHandler = id => {
    setUserId(id);
    setManagerObj(createManagerObj(id, currentGW));
    setSignedIn(true);
  };

  const createManagerObj = (id, gameweek) => {
    const gw = gameweek - 1;
    const managerArray = qpl23.filter(obj => obj.id === id);
    const managerPerf = oldData.filter(obj => obj.id === id);
    const filteredArray1 = managerArray.filter(Boolean);
    const filteredArray2 = managerPerf.filter(Boolean);
    const obj = {
      manager_name: filteredArray1[0]?.player_name,
      team_name: filteredArray1[0]?.entry_name,
      qpl_rank: filteredArray1[0]?.last_rank,
      overall_rank: filteredArray2[0]?.stats[id]?.current[gw]?.overall_rank,
      total_pts: filteredArray1[0]?.total,
      chips_used: filteredArray2[0]?.stats[id]?.chips,
      last_gw_rank: filteredArray2[0]?.stats[id]?.current[gw]?.rank,
      team_value: filteredArray2[0]?.stats[id]?.current[gw]?.value,
    };
    return obj;
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{ userId, setUserId: setUserIdHandler, signedIn, managerObj, setSignedIn }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/about"
              element={
                <div className="about-page-main-container">
                  <h1 className="temp">This is an about page</h1>
                </div>
              }
            />
            <Route
              path="/qpl-standings"
              element={<StandingsPage currentManager={managerObj} />}
            />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
