import { Link } from "react-router-dom";

export const Header = () => {
  return (
  <header className="header">
    <nav className="links">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
    </nav>
  </header>
  );
};
