import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Campaign from './components/Campaign/Campaign';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCampaign from './pages/CreateCampaign/CreateCampaign';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <div className='right'>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Campaign />} />
            <Route path='/create-campaign' element={<CreateCampaign />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
