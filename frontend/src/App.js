// import './App.css';
// import {Routes, Route, BrowserRouter} from 'react-router-dom'
// import LandingPage from './Components/LandingPage/LandingPage';
// import Operations from './Components/Operations/Operations';
// import Cards from './Components/Cards/Cards';
// import AuthorizationConfirm from './Components/AuthorizationConfirm/Authorization';
// import Authorization from './Components/Authorization/Authorization';
// import MainHeader from './Components/MainHeader/MainHeader';
// import AboutUs from './Components/AboutUs/AboutUs'
// import Advantages from './Components/Advantages/Advantages'
// import Reviews from './Components/Reviews/Reviews'
// function App() {
//   return (
//     <>
//     <MainHeader/>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Advantages />}/>
//           <Route path="/Reviews" element={<Reviews />}/>
//           <Route path="/AboutUs" element={<AboutUs />} />
//         <Route path="/" element={<LandingPage />}/>
//           <Route path="/Operations" element={<Operations />}/>
//           <Route path="/Cards" element={<Cards />} />
//        <Route path="/Authorization" element={<Authorization />} />
//        <Route path="/AuthorizationConfirm" element={<AuthorizationConfirm />} />
//       </Routes>
//     </BrowserRouter>
//   </>
//   );
// }

// export default App;

import './App.css';
import {Routes, Route, BrowserRouter, useLocation} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Operations from './Components/Operations/Operations';
import Cards from './Components/Cards/Cards';
import AuthorizationConfirm from './Components/AuthorizationConfirm/Authorization';
import Authorization from './Components/Authorization/Authorization';
import MainHeader from './Components/MainHeader/MainHeader';
import AboutUs from './Components/AboutUs/AboutUs'
import Advantages from './Components/Advantages/Advantages'
import Reviews from './Components/Reviews/Reviews'

import Account from './Components/Account/AccountPage'

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/Authorization", "/AuthorizationConfirm"];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && <MainHeader />}
      <Routes>
        <Route path="/" element={<Advantages />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/" element={<LandingPage />} />
          <Route path="/Operations" element={<Operations />} />
          <Route path="/Cards" element={<Cards />} />
        <Route path="/Authorization" element={<Authorization />} />
        <Route path="/AuthorizationConfirm" element={<AuthorizationConfirm />} />
        <Route path="/Account" element={<Account />} /> 
      </Routes>
    </>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}