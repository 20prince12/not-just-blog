import './App.css';
import Main from '../Main'
import Navbar from '../Navbar'
import Header from '../Header'
import { UserContextWrapper } from "../../context/UserContext";

const App = () => {
    return (
        <UserContextWrapper>
        <div className="App flex-row">
            <Header />
            <div className="App flex">
            <Navbar />
            <Main />
            </div>
        </div>
        </UserContextWrapper>
    );
  }

export default App;
