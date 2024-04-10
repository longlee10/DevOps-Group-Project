import "./App.css";
import Book from "./components/Book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book" element={<Book />} />
      </Routes>
    </Router>
  );
}

export default App;
