import { createContext, useState, useEffect } from "react";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [captured, setCaptured] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("captured")) || [];
    } catch {
      return [];
    }
  });
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    localStorage.setItem("captured", JSON.stringify(captured));
  }, [captured]);

  const toggleShiny = () => {
    setIsShiny((prev) => !prev);
  };

  const toggleCaptured = (pokemon) => {
    setCaptured((prev) =>
      prev.some((fav) => fav.id === pokemon.id)
        ? prev.filter((fav) => fav.id !== pokemon.id)
        : [...prev, pokemon],
    );
  };

  const isCaptured = (id) => captured.some((fav) => fav.id === id);

  return (
    <PokemonContext.Provider
      value={{ captured, isShiny, toggleShiny, toggleCaptured, isCaptured }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
