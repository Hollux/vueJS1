<template>
  <div id="jeux">
    <p>totototoo</p>
    <h1>{{ h1 }}</h1>
    <p>{{ textAccueil }}</p>
    <br>
    <div class="row text-center">
      <div class="col-sm-6"><img v-bind:src="'/static/jeux/' + numbrImg +'.jpg'" alt="imgMinima"></div>
      <div class="col-sm-6">
        <p>le film est : {{ Val }}</p>
        <p>Val en localStorage : {{ local }}</p>
        <div v-on:click="next" class="btn btn-success">+1</div>
      </div>
    </div>
  </div>
</template>

<script>
  // imports
  import Vue from 'vue'
  import VueLocalStorage from 'vue-localstorage'

  // base de vueLocalStorage
  Vue.use(VueLocalStorage)

  // tableau de base
  var array = [
    [1, 'alien'], [2, 'sda'], [3, 'spider-man'], [4, 'independance day'], [5, 'iron man'], [6, 'the big lebowsky'],
    [7, 'leon'], [8, 'matrix'], [9, 'hannibale lecteur'], [10, 'les tortues ninja'], [11, 'tron'], [12, 'avatar'],
    [13, 'les anges de charlie'], [14, 'district 9'], [15, 'sos fantome']]

  // si pas de tableau de base, on le créer
  if (Vue.localStorage.get('arrayActive') == null) {
    console.log(Vue.localStorage.get('arrayActive'))
    Vue.localStorage.set('arrayActive', JSON.stringify(array))
  }

  // Tableau avec modifs
  var ArrayActiv = JSON.parse(Vue.localStorage.get('arrayActive'))

  // Valeure du talbeau actif
  if (Vue.localStorage.get('intArrayActive') == null) {
    console.log(Vue.localStorage.get('intArrayActive'))
    var intActArray = intActiArray(ArrayActiv)
    Vue.localStorage.set('intArrayActive', intActArray)
  } else {
    var intActArray = Vue.localStorage.get('intArrayActive')
  }

  // functions pour le random
  function random (val) {
    return Math.floor(Math.random() * (val - 0) + 0)
  }

  // fonction pour avoir une clé du tableau
  function intActiArray (array) {
    var val = random(array.length)

    return val
  }

  // éléments de la page + methodes de la page

  export default {
    name: 'jeux',
    data () {
      return {
        h1: 'Bienvenu sur mon site en Vue.js',
        textAccueil: 'Bienvenue sur le mini Quizz cinéma, es que vous arrivez à reconnaitre ces films ?',
        numbrImg: ArrayActiv[intActArray][0],
        Val: ArrayActiv[intActArray][1],
        local: Vue.localStorage.get('someNumber')
      }
    },
    methods: {
      next () {
        var ArrayActiv = JSON.parse(Vue.localStorage.get('arrayActive'))
        var lastActArray = Vue.localStorage.get('intArrayActive')

        ArrayActiv.splice(lastActArray, 1)
        var intActArray = intActiArray(ArrayActiv)
        Vue.localStorage.set('intArrayActive', intActArray)
        Vue.localStorage.set('arrayActive', JSON.stringify(ArrayActiv))
      }
    }
  }
</script>
