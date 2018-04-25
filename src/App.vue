<template>
  <div id="app">
    <!--<router-link :to="{ name: 'index' }">
      <img src="./assets/logo.png">
    </router-link>-->
    <side-nav></side-nav>
    <div class="view container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SideNav from './components/nav/SideNav.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

Vue.use(BootstrapVue)

export default {
  name: 'App',
  components: {
    SideNav
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
