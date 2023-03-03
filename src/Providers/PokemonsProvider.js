// color-mode.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const PokemonContext = React.createContext()
export const PokemonProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [specificPokemon, setSpecificPokemon] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(20);
  // const [specifcSpecies,setSpecificSpecies] = useState();
  const navigate = useNavigate();
  const location = useLocation();
   //get Page number 
    useEffect(()=>
    {
          const currentlocation =  location.pathname;
          const exactPath = currentlocation.split('/')[1];
          const pathInNumber = Number(exactPath);
          setCurrentPage(pathInNumber);
          const offset = (pathInNumber - 1) * itemsPerPage;
          axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`).then(function (response) {
          // console.log("ALl PokeMon",response.data.results);
          setPokemon(response.data.results);
    });
    },[]);
    //this is function for getting specifc page in this function 
    //setting offset and sending a call
    const getPage = async(pageNumber) => {
      const offset = (pageNumber - 1) * itemsPerPage;
      const limit = itemsPerPage;
      await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(function (response) {
        // console.log("Page " + pageNumber + " PokeMon",response.data.results);
         setPokemon(response.data.results);
      });
    }
    const handlePageClick = (data)=>
    {
        // console.log("data",data.selected);
        const selectedPage =(data.selected+1);
        setCurrentPage(selectedPage);  
        setItemsPerPage(20); // set items per page back to default value
        getPage(selectedPage);
        navigate(`/${selectedPage}`)
     }

  return (
    <PokemonContext.Provider value={{ pokemon: pokemon, handlePageClick,specificPokemon: specificPokemon, currentPage: currentPage }}>
      {children}
    </PokemonContext.Provider>
  )
}
//custome hook 
export const usePokemon = () => {
    const { pokemon, handlePageClick, specificPokemon, currentPage } = useContext(PokemonContext)
    return { pokemon: pokemon, handlePageClick,specificPokemon: specificPokemon, currentPage };
}