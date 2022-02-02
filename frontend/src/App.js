import './App.css';
import Login from "./components/user/Login" 
import EventList from "./components/event/EventList";
import isLogged from "./hooks/useUser";

function App() {
  return (
    <div className="App">
    { isLogged() ? <EventList/> : <Login/> }
    </div>
  );
}

export default App;
