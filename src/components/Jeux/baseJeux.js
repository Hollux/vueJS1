// imports
import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

// base de vueLocalStorage
Vue.use(VueLocalStorage)

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