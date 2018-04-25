<template>
  <div class="hello">
    <h1>{{ h1 }}</h1>
    <h2>{{ h2 }}</h2>
    <ul>
      <li>
        <router-link :to="{ name: 'HelloWorld' }">vue.js</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Jeux' }">jeux</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Test' }">test</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      h1: 'Bienvenue sur mon site en Vue.js',
      h2: 'Pages Disponibles : '

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
