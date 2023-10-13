<template>
  <section class="search">
    <h2>Search for a pokémon</h2>
    <div class="input_box">
      <input
        v-on:keyup.enter="searchPoke()"
        type="text"
        name="input-search"
        placeholder="Search for a pokemon..."
        v-model="search"
      />
      <span @click="searchPoke()"><i class="fas fa-search"></i></span>
    </div>
    <p v-if="error" class="error-msg">Please enter a valid pokemon name !</p>
  </section>
</template>

<script>
const axios = require("axios").default;
export default {
  data() {
    return {
      search: "",
      error: false,
    };
  },
  methods: {
    async searchPoke() {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.search}`)
        .then((response) => {
          this.$router.replace({
            path: `/pokemon/${this.search.toLowerCase()}`,
          });
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    },
  },
};
</script>

<style lang="scss">
.search {
  margin: 7% auto;

  h2 {
    margin-bottom: 3%;
  }

  .input_box {
    position: relative;
    width: 70%;

    input {
      border: none;
      width: 100%;
      height: 50px;
      border-bottom: 2px solid black;
      margin-bottom: -3px;
      font-size: 0.9em;
      padding: 10px;
      transition: all 100ms ease-in-out;

      &:focus {
        outline: none;
        border-bottom: 4px solid black;
      }
    }

    svg {
      cursor: pointer;
      position: absolute;
      font-size: 1.2em;
      right: 1%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .error-msg {
    margin: 2% 0;
    color: red;
    font-size: 1.1em;
  }
}
</style>
