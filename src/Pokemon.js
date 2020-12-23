import React, { useEffect, useState } from 'react';
import mockData from "./mockData";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { toFirstCharUppercase } from './constants';
import { Link } from 'react-router-dom';
import axios from "axios";

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

// 1 pokemon= undefined, mostra que ainda esta pegado a info
// -> retorna loading
// 2 pokemon = good data, um nmr de pokemon valido, onde pegamos esse dado
// -> retorna o dado atual desse pokemon
// 3 pokemon = false bad data, nao existe
// -> retorna erro, not founded
    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
             .then(function(response) {
                 const {data} = response;
                 setPokemon(data);
             })
             .catch(function(error) {
                 setPokemon(false);
             })
    }, [pokemonId]);


    const generatePokemonJSX = () => {
        const { name, id , species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <>
                <Typography
                    variant="h1"
                >
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={ { width: "300px", height: "300px" } } src={fullImageUrl} />
                <Typography variant="h3"> Pokemon Info </Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height} </Typography>
                <Typography>Weight: {weight} </Typography>
                <Typography variant="h6"> Types: </Typography>
                {types.map((typeInfo) => {
                    const { type } = typeInfo;
                    const { name } = type;
                    return <Typography key={name}> {`${name}`}</Typography>;
                })}
            </>
        );
    };
    return (
        <> 
           {pokemon === undefined && <CircularProgress />}
           {pokemon !== undefined && pokemon && generatePokemonJSX()}
           {pokemon === false && <Typography> Pokemon nao encontrado </Typography> }
           {pokemon !== undefined && (
               <Button variant="contained" onClick={() => history.push("/")}>
                   voltar ao pokedex
               </Button>
           )}
        </>
    );
};

export default Pokemon;