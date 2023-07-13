import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { UserContext } from './UserContext';
import Header from './components/Header';
import StandingsPage from './pages/StandingsPage';
const { qpl23 } = require('./constants');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 457790,
    };
    this.setUserId = this.setUserId.bind(this);
  }

  componentDidMount() {
    const data = window.localStorage.getItem('userId');
    this.setState({ userId: JSON.parse(data) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      window.localStorage.setItem('userId', JSON.stringify(this.state.userId));
    }
  }

  getManagerName(id) {
    const managerArray = qpl23.map(obj => {
      if (obj.id === id) {
        return obj.player_name;
      }
      return null;
    });
    const filteredArray = managerArray.filter(element => element !== null);
    return filteredArray[0];
  }

  setUserId(id) {
    this.setState({ userId: id });
  }

  render() {
    const { userId } = this.state;
    const managerName = this.getManagerName(userId);

    return (
      <>
        <BrowserRouter>
          <UserContext.Provider value={{ userId, setUserId: this.setUserId }}>
            <Header managerName={managerName} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/about"
                element={
                  <>
                    <div className="about-page-main-container">
                      <h1 className="temp">This is an about page</h1>
                    </div>
                  </>
                }
              />
              <Route
                path="/qpl-standings"
                element={<StandingsPage />}
              />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
