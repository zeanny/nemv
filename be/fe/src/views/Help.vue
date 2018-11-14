<template>
  <!-- <HelloWorld /> -->
  <div>
    <h1>{{title}}</h1>
  <button @click="test">test</button>
   <v-btn :color="btnColor" @click="test">test</v-btn>
   <v-chip v-for="arg in args" v-bind:key="arg" :color="arg.cl">{{arg.name}}</v-chip>
  </div>
</template>

<script>

export default {
  name: 'help',
  data () {
    return {
      title: 'vuetify',
      btnColor: 'success',
      args: [
        {
          cl: 'primary',
          name: 'a'
        },
        {
          cl: 'secondary',
          name: 'b'
        },
        {
          cl: 'green',
          name: 'c'
        },
        {
          cl: 'warning',
          name: 'd'
        }
      ]
    }
  },
  methods: {
    test () {
      // console.log('test')
      this.title = 'test click'
      this.btnColor = 'warning'
    }
  }
}
</script>
