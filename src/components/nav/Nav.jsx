import { Link } from "react-router-dom";
import "./Nav.scss";
import { useAuth } from "../../hooks/useAuth";
import { LogoutIcon } from "../icons/Icons";
const Nav = () => {
  const { logout, user } = useAuth()
  const onLogout = (e) => {
    e.preventDefault()
    logout();
    navegate("/login");
  };
  return (
    <nav className="nav">
      <div className="nav_container">
        <div className="logo"><Link to={'/'}>Notas</Link></div> 
        {user ? <button className="btn btn_edit" onClick={onLogout}><LogoutIcon/> logout</button> : ""}
      </div>
    </nav>
  );
};

export default Nav;
