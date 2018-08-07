<template>
  <div id="app">
    <SortArray />
    <RxStarwars />
  </div>
</template>

<script>
import SortArray from './components/SortArray'
import RxStarwars from './components/RxStarwars'
import './assets/style/main.css' 

export default {
  name: 'App',
  components: {
    SortArray,
    RxStarwars
  }
}
</script>
