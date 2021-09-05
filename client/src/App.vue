<template>
  <div id="app">
    <Header :isLoggedIn="isLoggedIn" :updateState="updateState"/>
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
      let data = await response.json();
      this.isLoggedIn = data.isAuthenticated;
      console.log(data);
      console.log(this.isLoggedIn);
    }
  },
  data () {
    return {
      isLoggedIn: false
    }
  },
  mounted () {
    this.updateState();
  }
}
</script>