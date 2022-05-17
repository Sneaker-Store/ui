import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Perfil from './Perfil';
import Cart from './Cart';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/perfil' element={<Perfil />} />
      </Routes>
    </div>
  );
}

export default App;