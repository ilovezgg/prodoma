import './App.css';
import CallBack from './pages/callback/CallBack';
import Catalog from './pages/catalog/Catalog';
import Smeta from './pages/freeSm/Smeta';
import Header from './pages/header/Header';
import HowWeWork from './pages/howWeWork/HowWeWork';
import Main from './pages/main/Main';
import Review from './reviews/Review';
function App() {

  return (
    <div className="App">
      <Header/>
     <Main/>
     <Smeta/>
     <HowWeWork/>
     <Review/>
     <Catalog/>
     <CallBack/>
    </div> 
  );
}

export default App;
