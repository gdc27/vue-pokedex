<template>
  <header>
    <div>
      <h1>Pokédex</h1>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
header {
  width: 100%;
  margin-top: 1%;
  font-family: "Quicksand", sans-serif;
  & > div {
    display: flex;
    justify-content: center;
    & > h1 {
      font-size: 3em;
      font-weight: 600;
    }
  }
}
</style>
