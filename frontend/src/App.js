import './App.css';
import EventCard from './EventCard';
import RegisterApproval from './RegisterApproval';
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Acceptedusers from './Acceptedusers';
import Eventform from './Eventform';
import Home from './Home';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rejectedusers from './Rejectedusers';

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname == '/' && <Home />}
      <Switch>
        <Route exact path="/acceptedUsers" element={<Acceptedusers />} />
        <Route exact path="/registerApproval" element={<RegisterApproval />} />
        <Route exact path="/createEvent" element={<Eventform />} />
        <Route exact path="/Events" element={<EventCard />} />
        <Route exact path="/rejectedUsers" element={<Rejectedusers />} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
