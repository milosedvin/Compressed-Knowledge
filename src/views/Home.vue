<template>
  <v-container grid-list-xs id="cont">
    <v-row align-center class="info_box">
      <v-col sm3 xs12 offset-sm9>
        <h1>Compressed Knowledge</h1>
        <div>
          <p>
            "Body needs protein to grow - your intelect needs knowledge"<br>
            - Edvin Milos - 2019
          </p>
        </div>
        <div>
          <router-link class="button mt-10" to="/menu">SEE ALL COURSES</router-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  components: {
    
  },
};
</script>

<style lang="scss" scoped>
p{
  font-size: 1.2rem;
}
#cont {
  position: relative;
  z-index: 2;
  padding-left: 6vw;
}
.button{
  display: inline-block;
  background: map-get($colorz, yellow);
  padding: 40px 150px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  letter-spacing: 1px;
  transition: .2s;
}
.button:hover{
  filter: brightness(105%);
}

.row:first-child{
  height: 40vh;
}

.row:last-child{
  height: 40vh;
}
  
</style>
