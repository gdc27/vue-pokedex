<template>
  <div>
    <Search />
    <section>
      <h2>All Pokémons</h2>
      <div class="pokemons">
        <div
          v-for="pokemon of pokemons"
          :key="pokemon.order"
          class="pokemon"
          :data-name="pokemon.name"
        >
          <router-link
            :to="{ name: 'pokemon', params: { poke: pokemon.name } }"
          >
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
            <p>N°{{ pokemon.order }} : {{ pokemon.name }}</p>
          </router-link>
        </div>
      </div>

      <div class="navigation">
        <button :disabled="skip == 0" @click="changePage(-1)">
          <i class="fas fa-chevron-left prev"></i>
        </button>
        <input
          class="page_nb"
          type="number"
          name="skip"
          v-model="skip"
          min="0"
          :max="max"
        />
        <button :disabled="skip >= max" @click="changePage(1)">
          <i class="fas fa-chevron-right next"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
const axios = require("axios").default;
export default {
  components: {
    Search,
  },
  data() {
    return {
      pokemons: [],
      search: "",
      skip: 0,
      max: null,
    };
  },
  methods: {
    changePage(chg) {
      this.skip += chg;
    },
    async getPokemons(value) {
      let pokemons;
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${value * 9}`)
        .then((response) => {
          pokemons = response?.data?.results;
          this.max = Math.ceil(response?.data?.count / 9) - 1;
        })
        .catch(function (error) {
          console.log(error);
        });

      pokemons = await Promise.all(
        pokemons.map(function (pokemon) {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            .then(function (response) {
              return response?.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        })
      );
      this.pokemons = pokemons;
    },
  },
  watch: {
    skip: function (value) {
      if (value < 0 || value == "") this.skip = 0;
      if (value > this.max) this.skip = this.max;
      this.getPokemons(this.skip);
    },
  },
  async beforeMount() {
    this.getPokemons(this.skip);
    if (this.$route.query?.error) this.error = true;
  },
};
</script>

<style lang="scss">
.pokemons {
  display: grid;
  margin: auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 25px 25px;

  .pokemon {
    cursor: pointer;
    font-size: 1.2em;
    text-align: center;

    img {
      margin: auto;
      display: block;
      width: 100%;
    }

    p {
      font-family: "DotGothic16", sans-serif;
    }
  }
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
  button {
    background: none;
    border: 0;
  }

  svg {
    margin: 0 20px;
    font-size: 1.2em;
    cursor: pointer;

    &:hover {
      color: gray;
    }
  }

  input {
    font-family: "Quicksand", sans-serif;
    box-sizing: border-box;
    width: fit-content;
    text-align: center;
    font-size: 1.4em;
    background: none;
    border: none;
    outline: none;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
