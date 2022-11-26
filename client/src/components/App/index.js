import './App.css';
import Main from '../Main'
import Navbar from '../Navbar'
import Header from '../Header'
import { UserContextWrapper } from "../../context/UserContext";

const App = () => {
    return (
        <UserContextWrapper>
        <div className="App">
            <Header />
            <Main />
            <Navbar />
        </div>
        </UserContextWrapper>
    );
  }

export default App;
