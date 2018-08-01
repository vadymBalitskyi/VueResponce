<template>
  <div class="wrap">
    <div class="item">
      <h3>V-for</h3>
      <div class="titles">
        <p v-for="titleFirst in sortedTitlesES()">{{titleFirst}}</p>
      </div>
    </div>

    <div class="item">
      <h3>Map</h3>
      <div class="titles">
        <p v-for="titleSecond in sortedTitlesMap()">{{titleSecond}}</p>
      </div>
    </div>

  </div>
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
    sortedTitlesMap() {
      let map = new Map();

      this.array.map( (value, key) => map.set(value.title, key))

      // console.log(map);
      let mapAsc = new Map([...map].sort((a, b) => (a > b) - (a < b)) );
      for(let key in mapAsc) {
        console.log(mapAsc.get());
      }
      // return mapAsc;

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
  .wrap {
    display: flex;
    justify-content: center;
    color: tomato;
    font-family: sans-serif;
  }
  .item {
    padding: 50px;
  }
</style>
