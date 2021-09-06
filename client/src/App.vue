<template>
  <div id="app">
    <Header v-if="currentUser" :currentUser="currentUser" :updateState="updateState"/>
    <b-container>
      <router-view :updateState="updateState"/>
    </b-container>
  </div>
</template>

<script>
import Header from '@/Header';

export default {
  name: 'App',
  components: {
    Header
  },
  methods: {
    updateState: async function(){
      let response = await fetch('/getcurrentuser');
      this.currentUser = await response.json();
    }
  },
  data () {
    return {
      currentUser: null
    }
  },
  created () {
    this.updateState();
  }
}
</script>
