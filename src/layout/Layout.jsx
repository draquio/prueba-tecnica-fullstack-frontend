import Footer from "../components/footer/Footer";
import Menu from "../components/menu/Menu";
import Nav from "../components/nav/Nav";
import "./Layout.scss"
const Layout = (props) => {
  const { children } = props;
  return (
    <div className="container">
      <header><Nav /></header>
      <div className="content">
        <Menu />
        {children}
        </div>
      <footer className="footer"><Footer /></footer>
    </div>
  );
};

export default Layout;
