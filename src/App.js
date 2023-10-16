
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Contador from './components/Contador';
import BarraSuperior from './components/BarraSuperior';
import Cartas from './components/Cartas';


function App() {
  return (
    <div className="App">
    <BarraSuperior />
    <Cartas />
    </div>
  );
}

export default App;
