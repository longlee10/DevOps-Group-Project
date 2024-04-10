import "./App.css";
import Book from "./components/Book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* All other routes */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
