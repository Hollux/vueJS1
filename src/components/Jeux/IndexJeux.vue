<template>
  <div id="jeux">
    <h1>{{ h1 }}</h1>
    <p>{{ textAccueil }}</p>
    <br>
    <div class="row text-center">
      <div class="col-sm-6"><img v-bind:src="'/static/jeux/' + numbrImg +'.jpg'" alt="imgMinima"></div>
      <div class="col-sm-6">
        <div>
          <input id="response" v-model="response" v-on:keyup.enter="clientResp" placeholder="Votre réponse">
          <div v-on:click="clientResp" class="btn btn-success">Valider</div>
        </div>
        <p>Votre score : {{ score }} / {{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// imports
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'
import BaseJeux from './baseJeux.js'

// base de vueLocalStorage
Vue.use(VueLocalStorage)

base()
var ArrayActiv = JSON.parse(Vue.localStorage.get('arrayActive'))
var intQuestion = Vue.localStorage.get('intQuestion')
var arrayScore = JSON.parse(Vue.localStorage.get('arrayScore'))
var arrayResponses = JSON.parse(Vue.localStorage.get('arrayResponses'))

// éléments de la page + methodes de la page
export default {
  name: 'jeux',
  components: {
    BaseJeux
  },
  data () {
    var ArrayActiv = JSON.parse(Vue.localStorage.get('arrayActive'))
    var intQuestion = Vue.localStorage.get('intQuestion')
    var arrayScore = JSON.parse(Vue.localStorage.get('arrayScore'))
    if (ArrayActiv === null) {
      this.$router.push('jeuxEnd')
    }
    return {
      h1: 'Bienvenue sur mon site en Vue.js',
      textAccueil: 'Bienvenue sur le mini Quizz cinéma, es que vous arrivez à reconnaitre ces films ?',
      numbrImg: ArrayActiv[intQuestion][0],
      score: arrayScore[0],
      total: arrayScore[1],
      response: ''
    }
  },
  methods: {
    clientResp () {
      // vérif input correcte
      var response = textClean(this.response)
      var i
      var minValLevenshtein = 1000
      for (i = 0; i < ArrayActiv[intQuestion][1].length; i++) {
        var valLevenshtein = levenshtein(ArrayActiv[intQuestion][1][i], response)
        // on garde la valeur de levenshtein la plus petite
        if (valLevenshtein < minValLevenshtein) {
          minValLevenshtein = valLevenshtein
          // on garde la reponse la plus prochaine de celle de l'utilisateur
          var filmResp = ArrayActiv[intQuestion][1][i]
        }
      }
      // Si c'est juste, score +1
      if (minValLevenshtein <= (filmResp.length / 4)) {
        arrayScore[0] = arrayScore[0] + 1
        // si juste, reponse = reponse la plus proche du client
        arrayResponses.push(['respTrue', ArrayActiv[intQuestion][0], response, filmResp])
      } else {
        // si faux, reponse = premiere valeur du tableau
        arrayResponses.push(['respFalse', ArrayActiv[intQuestion][0], response, ArrayActiv[intQuestion][1][0]])
      }
      // Question +1
      arrayScore[1] = arrayScore[1] + 1

      // on set les nouvelles valeurs
      ArrayActiv.splice(intQuestion, 1)
      Vue.localStorage.set('arrayActive', JSON.stringify(ArrayActiv))
      Vue.localStorage.set('arrayScore', JSON.stringify(arrayScore))
      Vue.localStorage.set('arrayResponses', JSON.stringify(arrayResponses))

      // si question 40 , stop
      if (arrayResponses.length === 40) {
        Vue.localStorage.set('arrayActive', [])
        this.$router.push('jeuxEnd')
      }
      // on genere la nouvelle question
      intQuestion = intActiArray(ArrayActiv)
      Vue.localStorage.set('intQuestion', intQuestion)

      // on rafraichi la vue
      this.numbrImg = ArrayActiv[intQuestion][0]
      this.score = arrayScore[0]
      this.total = arrayScore[1]
      this.response = ''
    },
    page () {
      this.$router.push('jeuxEnd')
    }
  }
}

function base (action) {
  // tableau de base
  var array = arrayBase()

  // si pas de tableau de base, on le créer
  if (Vue.localStorage.get('arrayActive') === null || action === 'new') {
    Vue.localStorage.set('arrayScore', JSON.stringify([0, 0]))
    Vue.localStorage.set('arrayActive', JSON.stringify(array))
    Vue.localStorage.set('arrayResponses', JSON.stringify([]))
    var intQuestion = intActiArray(array)
    Vue.localStorage.set('intQuestion', JSON.stringify(intQuestion))
  } else if (JSON.parse(Vue.localStorage.get('arrayActive')).length === 0) {
    alert('la partie est terminé (pour une nouvelle clic new game et F5')
  }
}

// FUNCTIONS

// functions pour le random
function random (val) {
  return Math.floor(Math.random() * (val - 0) + 0)
}

// fonction pour avoir une clé du tableau
function intActiArray (array) {
  return random(array.length)
}

// nettoyage des charactères spéciaux
function textClean (val) {
  var val = val.split('')
  var valOut = []
  var valLen = val.length
  var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž'
  var accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz'
  for (var y = 0; y < valLen; y++) {
    if (accents.indexOf(val[y]) !== -1) {
      valOut[y] = accentsOut.substr(accents.indexOf(val[y]), 1)
    } else {
      valOut[y] = val[y]
    }
  }
  valOut = valOut.join('')
  return valOut.toLowerCase()
}

function levenshtein (a, b) {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  var matrix = []

  // increment along the first column of each row
  var i
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  // increment each column in the first row
  var j
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1)) // deletion
      }
    }
  }

  return matrix[b.length][a.length]
}

function arrayBase () {
  return [
    [1, ['alien']],
    [2, ['le seigneur des anneaux']],
    [3, ['spider-man', 'spider man']],
    [4, ['independance day']],
    [5, ['iron man', 'iron-ma,']],
    [6, ['the big lebowsky']],
    [7, ['leon']],
    [8, ['matrix']],
    [9, ['le silence des agneaux']],
    [10, ['les tortues ninja', 'tortues ninka', 'teenage mutant turtle']],
    [11, ['tron']],
    [12, ['avatar']],
    [13, ['les anges de charlie']],
    [14, ['district 9', 'district9']],
    [15, ['sos fantome']],
    [16, ['inception']],
    [17, ['intouchable']],
    [18, ['karate kid']],
    [19, ['mars attaque', 'mars attacks']],
    [20, ['megamind']],
    [21, ['predator']],
    [22, ['psycho']],
    [23, ['sos fantome']],
    [24, ['pulp fiction']],
    [25, ['spider-man', 'spider man']],
    [26, ['star wars', 'star wars 2', 'star wars l\'attaque des clones']],
    [27, ['terminator']],
    [28, ['shining']],
    [29, ['la-haut', 'up']],
    [30, ['harry potter']],
    [31, ['gravity']],
    [32, ['le cinquieme element']],
    [33, ['le hobbit']],
    [34, ['little miss sunshine']],
    [35, ['monstre & compagnie', 'monstre et compagnie']],
    [36, ['ocean\'s eleven']],
    [37, ['i robot', 'i,robot', 'i, robot']],
    [38, ['marie a tout prix']],
    [39, ['avengers', 'avenger']],
    [40, ['king kong', 'king-kong']],
    [41, ['indiana jones', 'indiana jones']],
    [42, ['fight club']],
    [43, ['the social network']],
    [44, ['insaisissable', 'now you see me']]
  ]
}
</script>
