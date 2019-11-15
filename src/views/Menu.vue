<template>
  <v-container id="cont">
    <v-row>
      <v-col offset-sm="1" md="5">
        <h1>Courses</h1>
        <div class="pa-2" id="info">
          <v-layout>
            <v-row justify="center">
              <v-card id="item_box" class="ma-5 card" v-for="item in menuItems" :key="item.name">
                <v-img class="white--text align-end" height="150px" v-bind:src="item.image"></v-img>

                <v-card-title style="font-size:1.5em" class="pa-3">
                  <span id="td_name">{{ item.name }}</span>
                </v-card-title>

                <v-card-text class="text--primary pa-3" style="font-size:1em">
                  <span id="menu_item_description">{{ item.description }}</span>
                </v-card-text>

                <v-card-text
                  class="pa-3 mb-10"
                  style="font-size:1em; font-weight: bold; color: black"
                >
                  <span id="menu_item_price">${{ item.price }}</span>
                </v-card-text>

                <v-card-actions class="justify-center button" v-on:click="addToBasket(item)">
                  <div>Add to cart</div>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-layout>
        </div>
      </v-col>
      <v-col offset-sm="1" md="4">
        <h1 id="basket">Basket</h1>
        <div class="pa-2" id="info">
          <v-simple-table v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width:50%">Quantity</th>
                  <th class="text-left" style="width:40%">Name</th>
                  <th class="text-left" style="width:10%">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    <div class="buttonBPlus" v-on:click="increaseQnt(item)">
                      <!-- <v-icon color="white">add_box</v-icon> -->
                    </div>
                    {{ item.quantity }}
                    <div class="buttonBMinus" v-on:click="decreaseQnt(item)">
                      <!-- <v-icon color="white">indeterminate_check_box</v-icon> -->
                    </div>
                  </td>
                  <td>
                    <span id="td_name">{{ item.name }}</span>
                    <br />
                  </td>
                  <td>${{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-simple-table v-else>
            <p>The basket is empty</p>
          </v-simple-table>

          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4" style="margin:0">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>
                <b>Total amount:</b>
              </p>
            </v-col>
            <v-col class="text-right">
              <p>${{ subTotal }}</p>
              <p>FREE</p>
              <p>
                <b>${{ total }}</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin:0">
            <v-spacer></v-spacer>
            <v-btn class="checkout" @click="addCheckoutItem()" text>Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basketDump: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    addCheckoutItem() {
      this.$store.dispatch("setCheckoutItem");
    },
    addToBasket(item) {
      // if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
      //     item=this.basket.find(itemInArray => item.name === itemInArray.name);
      //     this.increaseQnt(item);
      // }
      // else {
      // this.basket.push({
      //     name: item.name,
      //     price: item.price,
      //     quantity: 1
      // })
      // }
      this.basketDump.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
      this.$store.commit("addBasketItems", this.basketDump);
      this.basketDump = [];
    },
    increaseQnt(item) {
      item.quantity++;
    },
    decreaseQnt(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  },
  computed: {
    basket() {
      // return this.$store.state.basketItems
      return this.$store.getters.getBasketItems;
    },
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var deliveryPrice = 0;
      var totalCost = this.subTotal;
      return deliveryPrice + totalCost;
    }
  }
};
</script>

<style lang="scss" scoped>
#cont {
  padding-left: 0;
}
h1 {
  margin-top: 50px;
}
#basket:after {
  background: map-get($colorz, pink);
}
#info {
  background: #fff;
}

// _____________________ CARD ____________________

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

// _____________________ BASKET ____________________

.buttonBPlus,
.buttonBMinus {
  background: map-get($colorz, pink);
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  border-top: solid 1px rgb(190, 190, 190);
  color: white;
  height: 100px;
  width: 100px;
  position: relative;
  letter-spacing: 1px;
  transition: 0.2s;
  cursor: pointer;
}
.buttonBPlus:hover,
.buttonBMinus:hover {
  filter: brightness(105%);
}
.buttonBPlus::after,
.buttonBMinus::after {
  content: " ";
  position: absolute;
  display: block;
  background-color: #fff;
  height: 5px;
  margin-top: -5px;
  top: 50%;
  left: 10px;
  right: 10px;
  z-index: 9;
}
.buttonBPlus::before {
  content: " ";
  position: absolute;
  display: block;
  background-color: #fff;
  width: 5px;
  margin-left: -5px;
  left: 50%;
  top: 10px;
  bottom: 10px;
  z-index: 9;
}
tr th {
}
tr td {
  padding-left: 16px;
  font-size: 1.2rem;
}
#td_description {
  font-weight: 300;
}
#td_name {
  font-weight: 600;
}
#basket_checkout p:first-child {
  line-height: 0px;
}
.checkout {
  background: map-get($colorz, yellow);
}

// _____________________ MEDIA QUERIES ____________________

@media only screen and (max-width: 1903px) {
  .card {
    width: 250px;
  }
  .buttonBPlus,
  .buttonBMinus {
    width: 50px;
    height: 50px;
  }
}

@media only screen and (max-width: 1263px) {
  .card {
    width: 350px;
  }
  .buttonBPlus,
  .buttonBMinus {
    width: 20px;
    height: 20px;
  }
  .buttonBPlus::after,
  .buttonBMinus::after {
    left: 1px;
    right: 1px;
  }
  .buttonBPlus::before {
    top: 1px;
    bottom: 1px;
  }
}
</style>