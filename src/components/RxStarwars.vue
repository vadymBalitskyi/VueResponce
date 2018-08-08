<template lang="html">
  <section id="rx-starwars">
    <h3 class="title">Starwars</h3>
    <div class="items">
      <div class="item">
        <b-tabs v-model="activeTab">
          <b-tab-item v-for="persone of people$"
                      :key="persone.id"
                      :label="persone.name"></b-tab-item>
        </b-tabs>
      </div>
      <div class="item">
        <h4 class="title-4">{{ name$ }}</h4>
        <img class="img" v-stream:error="imageError$" :src="image$" alt="image">
      </div>
    </div>
  </section>
</template>

<script>
import Rx from "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";

export default {
  name: 'rx-starwars',
  data() {
    return {
      activeTab: 0
    }
  },
  domStreams: ["click$", "imageError$"],
  subscriptions() {
    const cache = {}
    const cachePersone = cache => url => {
      return cache[url] ?
             cache[url] :
             cache[url] = createLoader(url)
    }

    const myPromise = new Promise(
      (resolve, reject) => {
        // console.log("INVOKED");
        resolve(new Date())
      }
    )

    // Observable.from(myPromise).subscribe(value => console.log(value))
    //
    // setTimeout(() => {
    //   Observable.from(myPromise).subscribe(value => console.log(value))
    // }, 3000)

    const createLoader = url => Observable.from(
      this.$http.get(url)
    ).pluck("data")

    const people$ = createLoader(
      `https://starwars.egghead.training/people`
    ).map(people => people.slice(0, 7))

    const activeTab$ = this.$watchAsObservable(
      "activeTab",
      {immediate: true}
    ).pluck("newValue")

    const luke$ = activeTab$
      .combineLatest(
        people$,
        (tabId, people) => people[tabId].id
      )
      .map(id =>
        `https://starwars.egghead.training/people/${id}`
      )
      .switchMap(cachePersone(cache))
      .catch( err =>
        createLoader('https://starwars.egghead.training/people/2')
      )
      .share()

    const disabled$ = Observable.merge(
      this.click$.mapTo(true),
      luke$.mapTo(false)
    ).startWith(false)

    const buttonText$ = disabled$.map(
      bool => bool ? "Loading..." : "Load"
    );

    const name$ = luke$.pluck("name");

    const loadImage$ = luke$
      .pluck("image")
      .map(
        image => `https://starwars.egghead.training/${image}`
      );

    const failImage$ = this.imageError$.mapTo(`https://via.placeholder.com/400x400`)
    const image$ = Observable.merge(
      loadImage$,
      failImage$
    )
    return {
      name$,
      image$,
      disabled$,
      buttonText$,
      activeTab$,
      people$
    }
  }
}
</script>

<style scoped lang="css">
  .items {
    flex-direction: column;
  }
  .item {
    margin-bottom: 20px;
  }
  .b-tabs {
    display: flex;
    justify-content: center;
  }
  .img {
    border-radius: 50%;
  }
  .title-4 {
    font-size: 22px;
    margin-bottom: 10px;
  }
</style>
