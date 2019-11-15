<template>
  <v-app id="app">
    <navigation />
    

    <v-content>

        <router-view></router-view>

    </v-content>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';

  export default {
    components: {
      Navigation
    },
    name: 'App',
    props: {
      source: String,
    },

  }
</script>

<style lang="scss">
@keyframes fadein{from{transform:scaleX(.2)}to{transform:scaleX(1)}}

.info_box .col p{
  @include infobox_mixin(0px, 10px, 10px, map-get($colorz, black))
}

p{
  font-size: 1.2rem;
}
#cont {
  position: relative;
  z-index: 2;
  padding-left: 6vw;
}

h1, h2{
  font-size: 5rem;
  margin: 150px auto 20px;
  text-align: center;
  position: relative;
  display: inline-block;
}

h1:after, h2:after {
    content: attr(data-content);
    position: absolute;
    color: #000;
    top: 5px;
    left: -10px;
    width: 30%;
    height: 40%;
    padding: 0 10px;
    background-color: map-get($colorz, yellow);
    animation: fadein 1s normal forwards ease-in-out;
    animation-iteration-count: 1;
    z-index: -1;
    transition: 1s;
}
  
</style>