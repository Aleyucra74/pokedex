import React from 'react';

const Pokemon = (props) => {
    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;

    return <div>{`este sera o a pagina do pokemon #${pokemonId}`}</div>
};

export default Pokemon;