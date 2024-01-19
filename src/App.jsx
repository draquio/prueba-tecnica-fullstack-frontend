import "./App.scss";
import WebRouter from "./router/WebRouter";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <WebRouter />
    </BrowserRouter>
  );
}

export default App;
