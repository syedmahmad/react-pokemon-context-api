import { usePokemon } from "../Providers/PokemonsProvider";
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";

const Specfic = () => {
  const location = useLocation();
  const [abilites, setAbilities] = useState();
  const [species, setSpecies] = useState();
  const [evolsFrom, setEvolsFrom] = useState();
  const [chainURL, setChainUrl] = useState();
  const path = ("location", location.pathname);
  const name = path.split("/")[2];
  const number = path.split("/")[3];
  // const isInitialMount = useRef(false);
  const pokemonCall = async () => {
    console.log("called 123");
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}/`).then(function (response) {
      console.log("called 12321");
      setAbilities(response?.data?.abilities[0]?.ability?.name);
      setSpecies(response?.data?.species?.url);
    });
  }
  useEffect(() => {
      pokemonCall();
    
  }, []);
  useEffect(() => {
    if (evolsFrom) {
      getFurtherSpecies();
    }
  }, [evolsFrom]);
  useEffect(() => {
    if (chainURL) {
      evolutionChain();
    }
  }, [chainURL]);

  useEffect(() => {
    if (species) {
      getSpecies();
    }
  }, [species]);

  const getSpecies = async () => {
    await axios.get(`${species}`).then(function (response) {
      setEvolsFrom(response.data.evolves_from_species);
    });
  }

  const getFurtherSpecies = async () => {
    await axios.get(`${evolsFrom?.url}`).then(function (response) {
      console.log("Responss of getFurhterSpecies", response.data.evolution_chain);
      setChainUrl(response.data.evolution_chain);
    });
  }

  const evolutionChain = async () => {
    console.log("chainUrl", chainURL);
    await axios.get(chainURL.url).then(function (response) {
      console.log("Responss of Evolution chain::", response);
      const evolutionChain = response?.data;
      console.log("Evolution chain data::", evolutionChain);
    });
  }

  return (
    <div>
      <h1>Pokemon Name: {name}</h1>
      <h2>Pokemon abilites :{abilites}</h2>
      <h3>This Pokemon evolves from: {evolsFrom ? evolsFrom.name : 'It does not evolve'}</h3>
    </div>
  )
}

export default Specfic;



// useRef
// useMemo
// UseCallback