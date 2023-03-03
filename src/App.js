import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PokemonProvider } from './Providers/PokemonsProvider';
import Specfic from './components/Specfic';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <BrowserRouter>
        <PokemonProvider>
          <Routes>
          <Route path='/' element={<Navigate to="/1" />} /> 
          <Route path='/:id' element={<Home />} />
            
          {/* Dynamic routing is done here dynamically passing the id name and specfic pokemon number */}
          <Route path='/:id/:name/:number' element={<Specfic />} />
          </Routes>
        </PokemonProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
