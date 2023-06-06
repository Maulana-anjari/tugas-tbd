import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Book from './pages/Book';
import Home from './pages/Home';
import Author from './pages/Author';
import Inventory from './pages/Inventory';
import Publisher from './pages/Publisher';
import Staff from './pages/Staff';
import Store from './pages/Store';
const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/books" element={<Book />} />
      <Route exact path="/authors" element={<Author />} />
      <Route exact path="/publishers" element={<Publisher />} />
      <Route exact path="/staffs" element={<Staff />} />
      <Route exact path="/stores" element={<Store />} />
      <Route exact path="/inventories" element={<Inventory />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App;