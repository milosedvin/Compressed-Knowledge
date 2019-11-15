<template>
  <v-container fluid>
    <v-row>
      <v-col offset-sm="1" sm="6">
        <h1>Progress</h1>
        <div class="pa-2" id="info">
          <v-row class="ma-0">
            <v-col cols="12" md="1" class="pa-2">
              <p class="font-weight-bold body-1 pl-1 pink--text white">INFO:</p>
            </v-col>
            <v-col cols="12" md="5" class="pa-2 pl-5">
              <v-row align="center">
                <div id="status_box" class="yellow">COMPLETED</div>
                <span class="font-weight-light blue--text pl-1">Done</span>
              </v-row>
              <v-row align="center">
                <div id="status_box" class="blue">IN PROGRESS</div>
                <span class="font-weight-light blue--text pl-1">Still wating time on it</span>
              </v-row>
              <v-row align="center">
                <div id="status_box" class="black">NOT STARTED</div>
                <span class="font-weight-light blue--text pl-1">Not started yet</span>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" class="pa-2">
              <v-row>
                <div id="status_box" class="yellow">COMPLETED</div>
                <div id="status_box" class="blue">IN PROGRESS</div>
                <div id="status_box" class="black">NOT STARTED</div>
              </v-row>
              <v-row>
                <p class="font-weight-light caption pl-1">
                  <b>Information</b> to let you know this content has been
                  <b>curated caefully</b> by masters copywrites from all around the world.
                </p>
                <span class="font-weight-light caption pl-1">
                  <v-icon color="black">archive</v-icon>Hide the course. So no one will see how much time you have actually wasted
                </span>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <div class="pa-2 mt-1" id="info">
          <p class="font-weight-bold body-1 pa-3 pink--text white">ORDERS:</p>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width:10%">Order Nr.</th>
                  <th class="text-left" style="width:10%">QTY</th>
                  <th class="text-left" style="width:40%">Name</th>
                  <th class="text-left" style="width:10%">Price</th>
                  <th class="text-left" style="width:10%">Status</th>
                  <th class="text-left" style="width:10%">Archive item</th>
                  <th class="text-left" style="width:10%">Remove</th>
                </tr>
              </thead>
              <tbody class="font-weight-light">
                <tr v-for="item in orderItems" :key="item.name">
                  <td>
                    <p>{{ item.orderNumber }}</p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="item in item.orderLines"
                      :key="item.id"
                    >{{ item.quantity }}</p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="item in item.orderLines"
                      :key="item.id"
                    >{{ item.name }}</p>
                  </td>
                  <td class="py-3">
                    <p
                      style="margin:0;"
                      v-for="item in item.orderLines"
                      :key="item.id"
                    >{{ item.price }}</p>
                  </td>

                  <td>
                    <div id="status_box" class="blue">{{ item.status }}</div>
                  </td>
                  <td>
                    <v-btn small text v-on:click="addToBasket (item)">
                      <v-icon color="black">archive</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn small text v-on:click="deleteOrderItem (item.id)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>

      <v-col sm="4">
        <h1>Completed Courses</h1>
        <div class="pa-2" id="info">Money thrown away</div>
        <div class="pa-2 mt-1" id="info">Completed</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbOrders } from "../../firebase";

export default {
  data() {
    return {
      basketDump: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setOrderItems");
  },
  methods: {
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted");
        })
        .catch(error => {});
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
    orderItems() {
      return this.$store.getters.getOrderItems;
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
      var deliveryPrice = 100;
      var totalCost = this.subTotal;
      return deliveryPrice + totalCost;
    }
  }
};
</script>

<style lang="scss" scoped>
#status_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 90px;
  font-size: 12px;
  margin: 5px 0;
  color: map-get($colorz, white);
  border: solid 5px green;
}
#info {
  background: #fff;
}
</style>