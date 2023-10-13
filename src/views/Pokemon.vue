<template>
  <div>
    <Search />
    <section>
      <router-link :to="{ path: '/' }"
        ><i class="fas fa-long-arrow-alt-left home-button"></i
      ></router-link>
      <input
        type="checkbox"
        name="shiny"
        id="shiny"
        value="shiny"
        v-model="pokeState"
      />
      <input
        type="checkbox"
        name="rotate"
        id="rotate"
        value="back"
        v-model="pokeState"
      />
      <div v-if="pokemon.name" class="poke_wrap">
        <div>
          <img
            class="pokemon-sprite"
            :src="pokemon.sprites[pokeImg]"
            :alt="pokemon.name"
          />
          <label for="rotate"><i class="fas fa-retweet rotate"></i></label>
          <label for="shiny"><i class="fas fa-star shiny"></i></label>
          <img
            :src="require('../assets/images/bg.png')"
            alt="Background sprite"
          />
          <img
            :src="require('../assets/images/trainer.png')"
            alt="Trainer sprite"
          />
        </div>
        <div>
          <div class="capacities_wrap">
            <h2>Attacks</h2>
            <div class="capacities">
              <!-- @php $max = count($pokemon->moves); if($max < 4 ){ $limit = $max;
            }else{ $limit = 4; } @endphp @for ($i = 0; $i < $limit; $i++) @php
            if($max < 4){ $nb = $i ; }else{ $nb = rand(0,$max); } @endphp
            <p>{{$pokemon->moves[$nb]->move->name}}</p>
            @endfor -->
            </div>
          </div>
        </div>
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
      pokemon: {},
      error: null,
      pokeState: [],
    };
  },
  computed: {
    pokeImg: function () {
      const back = this.pokeState.includes("back");
      const shiny = this.pokeState.includes("shiny");

      return `${back ? "back" : "front"}_${shiny ? "shiny" : "default"}`;
    },
  },
  methods: {
    async updatePoke(pokemon) {
      this.pokemon = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(function (response) {
          return response?.data;
        })
        .catch((error) => {
          this.$router.push(`/?error=true`);
        });
    },
  },
  beforeRouteUpdate(to, from) {
    this.updatePoke(to.params.poke);
  },
  async beforeMount() {
    this.updatePoke(this.$route.params.poke);
  },
};
</script>

<style lang="scss">
.home-button {
  position: absolute;
  font-size: 2em;
  top: 4%;
  left: 4%;
}

input[type="checkbox"] {
  display: none;
}

img {
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.poke_wrap {
  border: 4px solid black;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;

  > div:first-child {
    display: flex;
    flex-direction: column;
    position: relative;

    img:first-of-type,
    img:last-of-type {
      width: 30%;
      position: absolute;
    }

    img:nth-of-type(2) {
      width: 100%;
    }
    label {
      svg {
        position: absolute;
        font-size: 1.5em;
        top: 2%;

        &:hover {
          cursor: pointer;
        }
      }

      &:first-of-type {
        svg {
          right: 2%;
        }
      }
      &:last-of-type {
        svg {
          right: 9%;
        }
      }
    }

    img:first-of-type {
      top: 0;
      right: 0;
      transform-origin: center;
      transform: translate(-30%, 10%);
    }

    img:last-of-type {
      bottom: 0;
      left: 2%;
    }
  }

  > div:nth-child(2) {
    div.capacities_wrap {
      border-top: 4px solid black;

      h2 {
        font-size: 1.5em;
        margin: 2% 0 0 3%;
      }

      > div.capacities {
        display: flex;
        flex-wrap: wrap;

        > p {
          width: 50%;
          text-align: left;
          padding: 3% 1% 3% 4%;
          font-size: 20px;
          text-transform: capitalize;
          position: relative;

          &.current::before {
            font-family: "Font Awesome 5 Free";
            content: "\f0da";
            display: inline-block;
            font-weight: 900;
            margin-right: 2%;
            //display: none;
            position: absolute;
            left: 4%;
          }
        }
      }
    }
  }
}

@media (max-width: 800px) {
  .home-button {
    position: relative;
    margin: 4% 0;
  }

  .poke_wrap {
    > div:first-child {
      label:last-of-type {
        svg:last-of-type {
          right: auto;
          left: 2%;
        }
      }
    }
  }
}
</style>
