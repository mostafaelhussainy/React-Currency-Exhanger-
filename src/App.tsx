import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Shared/NavBar/NavBar";
import Home from "./HomePage/Home";
import DetailsPage from "./DetailsPage/DetailsPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route 
            path="/React-Currency-Exhanger-/"
            element={<Home />}
          />
          <Route 
            path="/details-page/:from/:to/:am/:resu"
            element={<DetailsPage />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
