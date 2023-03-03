import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
const SpecficContext = React.createContext();
export const SpecficPokemonProvider = ({ children }) => {
    const [specificPokemon, setSpecificPokemon] = useState(null);
    const getUrl = async (url) => {
        if (url !== undefined) {
            await axios.get(url).then(function (response) {
                setSpecificPokemon(response.data.species);
            });
        }
    };
    return (
        <SpecficContext.Provider value={{ getUrl }}>
            {children}
        </SpecficContext.Provider>
    );
};

export const useSpecfic = () => {
    const { getUrl } = useContext(SpecficContext);
    return { getUrl };
};
