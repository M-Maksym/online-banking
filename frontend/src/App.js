import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Operations from './Components/Operations/Operations';
import Cards from './Components/Cards/Cards';
import AuthorizationConfirm from './Components/AuthorizationConfirm/Authorization';
import Authorization from './Components/Authorization/Authorization';
import MainHeader from './Components/MainHeader/MainHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
          <Route path="/Operations" element={<Operations />}/>
          <Route path="/Cards" element={<Cards />} />
       <Route path="/Authorization" element={<Authorization />} />
       <Route path="/AuthorizationConfirm" element={<AuthorizationConfirm />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;