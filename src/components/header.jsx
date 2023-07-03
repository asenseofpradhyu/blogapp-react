import { Link } from "react-router-dom";

//Local Imports
import "../css/header.css";

function Header() {
  return (
    <div className="header-main d-flex align-items-center justify-content-between">
      <div className="app-logo">
        <h4>Blogim!</h4>
      </div>
      <div className="navbar-menu-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Add blog</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
