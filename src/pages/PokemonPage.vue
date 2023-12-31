<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quien es este pokemon</h1>
    
    <PokemonPictureVue
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    />
    <PokemonOptionsVue
      :pokemons="pokemonArr"
      @selection="checkAnswer($event)"
    />

   <div class="fade-in" v-if="showAnswer">
     <h2>{{ message }}</h2>
     <button @click="newGame">Nuevo Juego</button>
   </div>
  </div>
</template>

<script>
import PokemonOptionsVue from "@/components/PokemonOptions.vue";
import PokemonPictureVue from "@/components/PokemonPicture.vue";

import getPokemonsOptions from '@/helpers/getPokemonOptions';

export default {
  components: { PokemonOptionsVue, PokemonPictureVue },
  data() {
    return {
      pokemonArr : [],
      pokemon    : null,
      showPokemon: false,
      showAnswer : false,
      message    : ''
    }
  },
  methods: {
    async mixPokemonArray(){
     this.pokemonArr = await getPokemonsOptions();

     const rndInt = Math.floor(Math.random() * 4);

     this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(pokemonId){
      console.log('Chequeo llamado', pokemonId);

      this.showPokemon = pokemonId ? true : false;
      this.showAnswer  = true;

      this.message = this.pokemon.id === pokemonId
      ? `Correcto, ${this.pokemon.name}`
      : `Oop era, ${this.pokemon.name}`;
    },
    newGame(){
      this.pokemonArr = [];
      this.pokemon    = null;
      this.showPokemon= false;
      this.showAnswer = false;
      this.message    = '';

    this.mixPokemonArray();
    }
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style></style>
