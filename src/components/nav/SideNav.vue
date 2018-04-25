<template>
  <div id="navH">
    <b-nav vertical>
      <b-nav-item><router-link to="/" exact>Accueil</router-link></b-nav-item>
      <b-nav-item><router-link :to="{ name: 'HelloWorld' }">Vue.js</router-link></b-nav-item>
      <b-nav-item><router-link :to="{ name: 'Jeux' }">Jeux</router-link></b-nav-item>
      <b-nav-item><router-link :to="{ name: 'Test' }">Test</router-link></b-nav-item>
      <p>{{$route.name}}</p>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'navH',
  data () {
    return {
      isActive: true
    }
  }
}
</script>

<style>
  #navH {
    top: 0px;
    position: fixed;
    width: 304px;
    bottom: 0;
    z-index: 100;
    overflow: auto;
    margin-top: 60px;

  }
  .router-link-active {
    font-weight: bold;
    color: black;
    pointer-events: none;
    cursor: default;
  }
</style>
