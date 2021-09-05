<template>
  <div id="app">
    <Header/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Header from '@/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>