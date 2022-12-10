import './App.css';
import Main from '../Main'
import Navbar from '../Navbar'
import Header from '../Header'
import { UserContextWrapper } from "../../context/UserContext";

const App = () => {
    return (
        <UserContextWrapper>
        <div className="App bg-gray-200 dark:bg-gray-800 flex-row">
            <Header />
            <div className="flex content-center">
            <Navbar />
            <Main />
            </div>
        </div>
        </UserContextWrapper>
    );
  }

export default App;
