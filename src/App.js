
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import GlobalStyle from './style/GlobalStyles';
import SearchBook from './components/SearchBook';

function App() {
  return (
    <>
      <GlobalStyle/>
      <Nav/>
      <SearchBook/>
      {/* <Routes>
        <Route path='/' element = {<SearchBook/>}/>
      </Routes> */}

      <Outlet/>
    </>
  );
}

export default App;
