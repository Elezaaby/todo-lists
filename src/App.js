import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import './App.css';
import { UserDataContextProvider } from './UserDataContext';



function App() {

  return (
    <div className='app'>
      <UserDataContextProvider>
        <Header />
        <Home />
      </UserDataContextProvider>
    </div>
  );
}

export default App;
