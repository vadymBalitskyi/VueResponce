<template>
  <section id="sort-array">
    <h3 class="title">Sorted array</h3>
    <div class="items">

      <div class="item">
        <h4 class="h4">v-for</h4>
        <div class="titles">
          <p v-for="titleFirst in sortedTitlesES()">{{titleFirst}}</p>
        </div>
      </div>

      <div class="item">
        <h4 class="h4">lodash</h4>
        <div class="titles">
          <p v-for="titleSecond in sortedTitlesLodash()">{{titleSecond}}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  export default {
  name: 'Test',
  data () {
    return {
      store: {},
      array: []
    }
  },
  methods: {
    sortArray (a, b) {
      return (a > b) - (a < b);
    },
    sortedTitlesES() {
      let titles = [];

      for(let key in this.array) {
        titles.push(this.array[key].title);
      }

      return titles.sort(this.sortArray);
    },
    sortedTitlesLodash() {
      let item = _.sortBy(this.array, ['title']);

      return item.map(value => value.title);
    }
  },
  mounted() {
    let src = './static/test.json'

    this.$http.get(src).then(response => {
      this.store = response.body,
      this.array = response.body.array
    }, error => alert(error))
  }
}
</script>

<style scoped>

</style>
