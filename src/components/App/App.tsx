import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Catalog from "../pages/Catalog/Catalog";
import CatalogID from "../pages/CatalogID/CatalogID";
import Header from "../Header/Header";
import css from "./App.module.css";

function App() {
  return (
    <div className={css.container}>
      <Router>
        <Header />

        <main className={css.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<CatalogID />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
