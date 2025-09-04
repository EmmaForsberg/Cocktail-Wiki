import './App.css'
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
       <nav style={{ background: 'lightgray', padding: '1rem' }}>
        <Link to="/">Landing</Link>
        <Link to="/search">Search</Link>
      </nav>
      <Outlet /> {/* Här renderas sidan beroende på URL */}
    </>
  );
}

export default App
