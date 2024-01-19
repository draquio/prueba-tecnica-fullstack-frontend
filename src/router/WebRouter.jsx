import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useAuth } from "../hooks/useAuth";
import CreateNote from "../pages/CreateNote";
import EditNote from "../pages/EditNote";
import Archive from "../pages/Archive";
const WebRouter = () => {
  const { user } = useAuth();
  const loadLayaout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {!user ? (
        <Route path="/*" element={loadLayaout(Layout, Login)} />
      ) : (
        <>
          <Route path="/" element={loadLayaout(Layout, Home)} />
          <Route path="/create" element={loadLayaout(Layout, CreateNote)} />
          <Route path="/edit/:id" element={loadLayaout(Layout, EditNote)} />
          <Route path="/archive" element={loadLayaout(Layout, Archive)} />
        </>
      )}
    </Routes>
  );
};

export default WebRouter;
