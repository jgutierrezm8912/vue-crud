<template>
  <div id="app">
    <navBar></navBar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import navBar from './components/navBar'
export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>