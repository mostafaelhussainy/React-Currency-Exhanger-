import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Shared/NavBar/NavBar";
import Home from "./HomePage/Home";
import DetailsPage from "./DetailsPage/DetailsPage";
import Footer from "./Shared/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route 
            path="/"
            element={<Home />}
          />
          <Route 
            path="/details-page"
            element={<DetailsPage />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
