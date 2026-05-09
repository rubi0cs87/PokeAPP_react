import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filters from "./pages/Filters";
import PokemonCard from "./pages/PokemonDetail";
import Navbar from "./components/Navbar";
import Captured from "./pages/Captured";
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filters" element={<Filters />} />
          <Route path="/pokemon/:id" element={<PokemonCard />} />
          <Route path="/captured" element={<Captured />} />
        </Routes>
      </PokemonProvider>
    </BrowserRouter>
  );
}

export default App;
