<template>
  <v-container id="cont">
    <v-row class="info_box">
      <v-col offset-md="2" md="8" xs="12">
        <h1>Log in</h1>

        <div class="form">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" label="Password" required></v-text-field>

          <div class="button login" v-on:click.prevent="signIn()">Log in</div>
          <div class="button logout" v-on:click.prevent="signOut()">Log out</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Incorrect password, try harder");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logged out successfully");
          this.$router.replace("/");
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
h1:after {
  background: map-get($colorz, cyan);
}
.form {
  background: #fff;
  padding: 20px;
}
.button {
  display: inline-block;
  padding: 20px 50px;
  margin-right: 10px;
  margin-top: 40px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  letter-spacing: 1px;
  transition: 0.2s;
  cursor: pointer;
}
.button:hover {
  filter: brightness(105%);
}
.login {
  background: map-get($colorz, cyan);
}
.logout {
  background: map-get($colorz, red);
}
</style>