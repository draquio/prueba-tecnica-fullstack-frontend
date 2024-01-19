import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.scss";
import { useAuth } from "../../hooks/useAuth";
import Filter from "../categorie/Filter";
const Menu = () => {
  const { user } = useAuth();
  const path = useLocation();
  const newPath = path.pathname.split("/");
  if (!user) return "";
  return (
    <div className="menu">
      <div className="menu_left">
        <p>Ruta: "{`/${newPath[1]}`}"</p>
      </div>
      <div className="menu_rigth">
        <Filter />
        <Link to={"/create"}>Crear nuevo</Link>
        <Link to={"/archive"}>Archivados</Link>
      </div>
    </div>
  );
};

export default Menu;
