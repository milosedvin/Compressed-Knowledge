<template>
  <v-container id="cont">
    <v-row>
      <v-col offset-sm="1" sm="6">
        <h1>Add New Item</h1>
        <div class="pa-2" id="info">
          <v-text-field v-model="name" label="Product name"></v-text-field>
          <v-text-field v-model="description" label="Description"></v-text-field>
          <v-text-field v-model="price" label="Price"></v-text-field>
          <v-file-input label="Chhose file" v-on:change="uploadImage"></v-file-input>
          <v-btn
            text
            tile
            class="addItem"
            v-on:click="addNewMenuItem()"
            :disabled="btnDisable"
          >Add Item</v-btn>
          <v-btn text tile class="cancel">Cancel</v-btn>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Preview</h1>
        <div class="pa-2" id="info">
          <v-layout>
            <v-row justify="center">
              <v-card id="item_box" class="ma-5 card">
                <v-img class="white--text align-end" id="img" height="150px" src></v-img>

                <v-card-title style="font-size:1.5em" class="pa-3">
                  <span id="td_name">{{ name }}</span>
                </v-card-title>

                <v-card-text class="text--primary pa-3" style="font-size:1em">
                  <span id="menu_item_description">{{ description }}</span>
                </v-card-text>

                <v-card-text class="pa-3" style="font-size:1em; font-weight: bold; color: black">
                  <span id="menu_item_price">${{ price }}</span>
                </v-card-text>

                <v-card-actions class="justify-center button">
                  <div>Add to cart</div>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-layout>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd, fb } from "../../../firebase";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisable: true
    };
  },
  methods: {
    uploadImage(e) {
      let file = e;
      console.log(e);
      var storageRef = fb.storage().ref("products/" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
            console.log("File available at", downloadURL);
            document.getElementById("img").src = downloadURL;
            this.btnDisable = false;
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  position: relative;
}
.button {
  background: map-get($colorz, pink);
  text-decoration: none;
  border-top: solid 1px rgb(190, 190, 190);
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  letter-spacing: 1px;
  transition: 0.2s;
  cursor: pointer;
}
.button:hover {
  filter: brightness(105%);
}
h1:after {
  background: map-get($colorz, cyan);
}
#info {
  background: #fff;
}
tr th {
  font-weight: 400;
}
tr td {
  padding: 10px 10px 10px 16px;
}
#td_description {
  font-weight: 300;
}
#td_name {
  font-weight: 600;
}
#basket_checkout {
  font-size: 13px;
}
#basket_checkout p:first-child {
  line-height: 0px;
}
.addItem {
  background: map-get($colorz, cyan);
  height: 60px !important;
  width: 150px !important;
  margin-right: 20px;
}
.cancel {
  background: map-get($colorz, red);
  height: 60px !important;
  width: 150px !important;
}
.cancel:hover,
.addItem:hover {
  filter: brightness(105%);
}
</style>