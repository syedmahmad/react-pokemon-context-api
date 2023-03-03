import React, { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePokemon } from "../Providers/PokemonsProvider";
import ReactPaginate from 'react-paginate';
import { useSpecfic } from "../Providers/SpecficPokeProvider";
function Home() {
    const { pokemon, handlePageClick, currentPage } = usePokemon();
    const totalRecords = 1279;
    const itemsPerPage = 20;
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    return (
        <>
            <h1>Pokemone Character Using Context API</h1>
            <h2>All Pokemon List</h2>
            {pokemon?.length > 0 && (pokemon.map((item, index) => {
                // console.log("Item Url",item.url)
                const url = item.url.slice(0, item.url.length - 1);
                const lastNumber = url.split("/").pop();
                // console.log(lastNumber); 
                // console.log("Last Number",lastNumber);
                return (
                    <div key={index}>
                        <p>{item.name}</p>
                        <Link to={`/${currentPage}/${item.name}/${lastNumber}`}>
                            {item.url}
                        </Link>
                    </div>
                )
            }))};
            <br />
            <br />
            <ReactPaginate
                breakLabel="..."
                nextLabel={currentPage < `${totalPages}` ? "< next" : null}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                forcePage={currentPage - 1}
                previousLabel={currentPage > 1 ? "< previous" : null}
                renderOnZeroPageCount={null}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    )
}
export default Home;