<template>
  <section id="sort-array">
    <h3 class="title">Sorted array</h3>
    <div class="items">

      <div class="item">
        <h4 class="h4">v-for</h4>
        <div class="titles">
          <p v-for="titleFirst in sortedTitlesEs()">{{titleFirst}}</p>
        </div>
      </div>

      <div class="item">
        <h4 class="h4">lodash</h4>
        <div class="titles">
          <p v-for="titleSecond in sortedTitlesLodash()">{{titleSecond}}</p>
        </div>
      </div>

      <div class="item">
        <h4 class="h4">rx</h4>
        <div class="titles">
          <p v-for="titleThird in sortedTitles$">{{titleThird}}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import Rx from "rxjs/Rx";
  import {Observable} from "rxjs/Observable";
  import "rxjs/add/observable/interval";
  import { pluck, map } from 'rxjs/operators'

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
    sortedTitlesEs() {
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
  },
  subscriptions() {
    // const src$ = './static/test.json';
    // const titles$ = Observable
    //   .from(
    //     this.$http.get(src$)
    //   )
    //   .pluck("data", "array")

    const test = [
      {"title" : "title1"},
      {"title" : "title5"},
      {"title" : "title7"},
      {"title" : "title3"}
    ]

    const array$ = test
      .map(
        arr => arr.title
      )

    const sortedTitles$ = Observable
      .of(array$)
      .map(
        arr => arr.sort()
      )

    return {
      sortedTitles$
      // titles$
    }
  },
}
</script>

<style scoped>

</style>
