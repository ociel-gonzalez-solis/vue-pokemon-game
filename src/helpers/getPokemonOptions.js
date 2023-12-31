import pokemonApi from "@/api/pokemonApi";

const getPokemons = () => {
    const pokemonArr = Array.from(Array(650));
    return pokemonArr.map((_, index) => index + 1);
}

const getPokemonsOptions = async() => {
    const mixedPokemons = getPokemons().sort(()=> Math.random() - 0.5);

    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
    return pokemons;
};

const getPokemonNames = async (pokemons = []) => {
    let   pokemones  = [];
    const promiseArr = pokemons.map((pokemon) => pokemonApi.get(`/${pokemon}`));
    const resps      = await Promise.all(promiseArr);

    pokemones = resps.map(({data}) => ({name: data.name, id: data.id}));

    return pokemones;
}


export default getPokemonsOptions;