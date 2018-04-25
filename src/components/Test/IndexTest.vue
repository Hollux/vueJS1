<template>
  <div id="app2">
    {{ message }}
    <button @click="bonjour">Hello</button>
  </div>
</template>

<script>

export default {
  name: 'app2',
  data () {
    return {
      message: 'Hello Vue !',
      message2: 'test de contenu'
    }
  },
  methods: {
    bonjour () {
      this.message = this.message2
    }
  }
}
</script>
