<template>
  <div id="app">
    <SortArray />
    <RxStarwars />
  </div>
</template>

<script>
import './assets/style/main.css'
import SortArray from './components/SortArray'
import RxStarwars from './components/RxStarwars'

export default {
  name: 'App',
  components: {
    SortArray,
    RxStarwars
  }
}
</script>
