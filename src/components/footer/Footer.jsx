import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
const Footer = () => {
  return (
    <Link to={"https://draquioportfolio.vercel.app/"} target="_blank">
      © Sergio Mercado (Draquio) | Fullstack Developer
    </Link>
  );
};

export default Footer;
