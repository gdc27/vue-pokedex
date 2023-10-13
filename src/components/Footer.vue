<template>
  <footer>
    <div>
      <p>
        Made by
        <a
          href="https://mmi.univ-savoie.fr/~maiadacg/portfolio/"
          target="_blank"
          >Gabriel DC.</a
        >
      </p>
      <p>
        Powered by <a href="https://pokeapi.co/" target="_blank">PokeAPi</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
footer {
  position: fixed;
  width: 100%;
  bottom: 1%;
  font-family: "Quicksand", sans-serif;
  & > div {
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: space-between;

    > p {
      font-weight: 400;
      font-size: 1em;
    }
  }
}
</style>
