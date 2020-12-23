import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import mockData from './mockData';
import { toFirstCharUppercase } from './constants';
import axios from 'axios';

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',
    },
    cardMedia: {
        margin:"auto",
    },
    cardContent: {
        textAlign: "center",
    },
});

const Pokedex = (props) => {
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(function (response) {
                const {data} = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            index + 1
                        }.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]);
        const {id, name, sprite} = pokemonData[pokemonId];
        // const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={ () => history.push(`/${pokemonId}`) }>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px" ,height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map((pokemonId) =>
                        getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </>
    );
};

export default Pokedex;