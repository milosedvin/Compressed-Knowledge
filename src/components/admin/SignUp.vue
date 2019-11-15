<template>
    <v-container>
        <v-row class="info_box">
            <v-col offset-md="2" md="8" xs="12">
                <h1>Create new account</h1>

                <form id="sign-up">
                    <div class="input_field">
                        <input type="email" id="email" required>
                        <label for="email">Email</label>
                    </div>
                    <div class="input_field">
                        <input type="password" id="pass" required>
                        <label for="pass">Password</label>
                    </div>
                    <button>Sign up</button>
                </form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import * as firebase from 'firebase';
import 'firebase/firestore';

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            signIn() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
                    this.$router.replace('/admin');
                })
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert ("Incorrect password, try harder")
                    } else {
                        alert (errorMessage)
                    }
                    console.log(error)
                })
            },
            signOut() {
                firebase.auth().signOut().then(() => {
                    alert ('Logged out successfully');
                    this.$router.replace('/');
                })
                .catch(error => {
                    alert(error);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.form{
    background: #fff;
    padding: 20px;
}
.login{
    background: map-get($colorz, yellow);
}
.logout{
    background: map-get($colorz, red);
}
.input_field{
    background: white;
    margin: 5px;
}
#email{
    background: grey;
}
#pass{
    background: grey;
}
</style>