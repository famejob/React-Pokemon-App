import { useState, useEffect } from "react";
import "./Style.css";
import axios from "axios";
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectPokemon] = useState(null);
  const itemsPerPage = 20;

  const handleNext = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((currentPage) =>
      currentPage > 1 ? currentPage - 1 : currentPage
    );
  };
  const handleClickPokemon = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setSelectPokemon(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const showPokemonList = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        setPokemonList(
          response.data.results.map((item, index) => ({
            ...item,
            id: (currentPage - 1) * itemsPerPage + index + 1,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };
    showPokemonList();
  }, [currentPage]);
  return (
    <>
      <h1 className="name-app">POKEMON APP</h1>
      <div className="container">
        <div className="left-content">
          {pokemonList.length > 0 && (
            <>
              {pokemonList.map((item) => {
                return (
                  <>
                    <div
                      className="card"
                      key={item.id}
                      onClick={() => handleClickPokemon(item.name)}
                    >
                      <div>{item.id}</div>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                      />
                      <div>{item.name}</div>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
        <div className="right-content">
          {selectedPokemon && (
            <>
              <h1>{selectedPokemon.name}</h1>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${selectedPokemon.id}.svg`}
                alt=""
              />
              <div className="abilities">
                {selectedPokemon.abilities.map((ability, index) => (
                  <div className="group" key={index}>
                    {ability.ability.name}
                  </div>
                ))}
              </div>
              <div className="base-stat">
                <h3>Stats:</h3>
                {selectedPokemon.stats.map((stat, index) => (
                  <h3 key={index}>
                    {stat.stat.name}: {stat.base_stat}
                  </h3>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        {currentPage === 1 ? (
          <button onClick={handleNext} className="btn btn-next">
            Next
          </button>
        ) : (
          <>
            <div className="btn-group">
              <button onClick={handlePrev} className="btn btn-prev">
                Previous
              </button>
              <button onClick={handleNext} className="btn btn-next">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
