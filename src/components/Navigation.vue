<template>
  <div>
    <v-navigation-drawer
      color="white"
      v-model="drawer"
      tamporary
      absolute
      class="hidden-md-and-up links"
    >
      <ul>
        <div v-if="currentUser">
          <v-card class="mx-auto" max-width="200" tile>
            <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
              <v-row align="end" class="fill-height">
                <v-col align-self="start" class="pa-0" cols="12">
                  <v-avatar class="profile" color="grey" size="65" tile>
                    <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{ currentUser.email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </div>
        <router-link tag="li" to="/">Home</router-link>
        <router-link tag="li" to="/menu">Menu</router-link>
        <router-link tag="li" to="/about">About</router-link>
        <router-link tag="li" to="/login">Login</router-link>
        <div v-if="currentUser">
          <router-link
            tag="li"
            v-if="currentUser.email != 'admin@admin.com'"
            to="/progress"
          >My Courses</router-link>
        </div>
        <div v-if="currentUser">
          <router-link tag="li" v-if="currentUser.email === 'admin@admin.com'" to="/admin">Admin</router-link>
        </div>
      </ul>
    </v-navigation-drawer>

    <v-toolbar color="black" app flat id="desktop" height="110px">
      <v-app-bar-nav-icon color="white" class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline">
        <router-link to="/">
          <img
            src="https://i.ibb.co/5GYH00Z/Seek-Png-com-fiverr-logo-png-5538220.png"
            alt="logotype"
            style="width: 120px;"
          />
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link tag="li" class="nav" to="/">Home</router-link>
      <router-link tag="li" class="nav" to="/menu">Menu</router-link>
      <router-link tag="li" class="nav" to="/login">Login</router-link>
      <div v-if="currentUser" class="nav">
        <router-link
          tag="li"
          v-if="currentUser.email != 'admin@admin.com'"
          to="/progress"
        >My Courses</router-link>
      </div>
      <div v-if="currentUser" class="nav">
        <router-link tag="li" v-if="currentUser.email === 'admin@admin.com'" to="/admin">Admin</router-link>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
import { db } from "../../firebase";

import firebase from "firebase";
import "firebase/firestore";
import store from "../store.js";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar__content {
  height: 150px !important;
}
span {
  color: map-get($colorz, white);
}
.nav {
}

.links ul {
  padding: 0;
  margin-top: 30px;
  text-decoration: none;
  position: relative;
}

.links li {
  color: map-get($colorz, black);
  font-weight: bold;
  font-size: 1.3rem;
  padding-left: 5%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
  background: rgb(255, 255, 255);
  transition: 0.2s;
}
.links li:hover {
  color: map-get($colorz, blue);
  background: rgb(240, 240, 240);
}
.links li:last-child {
  position: absolute;
  bottom: -60vh;
  width: 100%;
}

#desktop li {
  color: map-get($colorz, white);
  font-weight: bold;
  font-size: 1.3rem;
  padding-left: 5%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  transition: 0.2s;
}
#desktop li:hover {
  color: map-get($colorz, yellow);
  font-weight: bold;
}

@media only screen and (max-width: 960px) {
  .nav {
    display: none;
  }
}
</style>