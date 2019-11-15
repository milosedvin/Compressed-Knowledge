<template>
    <v-container id="cont">
        <v-snackbar
            v-model="updateSuccess"
            >
            {{ updatedText }}
            <v-btn
                color="pink"
                text
                @click="updateSuccess = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-row>
            <v-col offset-sm="1" sm="8">
                <h1>Available Courses</h1>
                <div class="pa-2" id="info">
                    
                <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        
                        <th class="text-left" style="width:70%">Name
                            <v-btn color="yellow" small text to="addNew">
                                <v-icon>add</v-icon><span style="padding:0 10px">Add Item</span>
                            </v-btn>
                        </th>
                        <th class="text-center" style="width:100px">Price</th>
                        <th class="text-center" style="width:100px">Edit</th>
                        <th class="text-center" style="width:100px">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in menuItems" :key="item.name">
                        <td>
                            <span id="td_name">{{ item.name }}</span> <br>
                            <span id="td_description">{{ item.description }}</span>
                        </td>
                        <td>${{ item.price }}</td>
                        <td>
                            <v-btn small text @click.stop="dialog = true" v-on:click="editItem(item)">
                                <v-icon color="pink">edit</v-icon>
                            </v-btn>
                        </td>
                        <td>
                            <v-btn small text v-on:click="deleteItem(item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                    </tbody>
                </template>
                </v-simple-table>
                </div>
            </v-col>


        </v-row>
        <v-row>
            <v-dialog
            v-model="dialog"
            max-width="290"
            >
            <v-card>
              <h1>Edit Item</h1>
                <div class="pa-5" id="info">
                    <v-text-field v-model="item.name" label="Product name"></v-text-field>
                    <v-text-field v-model="item.description" label="Description"></v-text-field>
                    <v-text-field v-model="item.price" label="Price"></v-text-field>
                    <v-btn text class="addItem" v-on:click="updateItem()" @click.stop="dialog = false"> Edit Item </v-btn>
                    <v-btn text class="cancel" @click.stop="dialog = false"> Cancel </v-btn>
                </div>
            </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase'

     export default {
    data () {
      return {
        basket: [],
        dialog: false,
        item: [],
        activeEditItem: null,
        updateSuccess: false,
        updatedText: 'Item has been updated successfully'
      }
    },
    beforeCreate() {
        this.$store.dispatch('setMenuItems')
    },
    
    methods: {
        editItem(item) {
            this.item = item
            this.activeEditItem = item.id
        },
        updateItem() {
            dbMenuAdd.doc(this.activeEditItem).update(this.item)
            .then(() => {
                this.updateSuccess = true;
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        },
        deleteItem (item) {
            dbMenuAdd.doc(item.id).delete().then(function() {
               // console.log("Document successfully deleted!");
            }).catch(function(error) {
               // console.error("Error removing document: ", error);
            });
        },
        addToBasket (item) {
            if (this.basket.find(itemInArray => item.name === itemInArray.name)) {
                item=this.basket.find(itemInArray => item.name === itemInArray.name);
                this.increaseQnt(item);
            }
            else {
            this.basket.push({
                name: item.name,
                price: item.price,
                quantity: 1
            })
            }
        },
        increaseQnt (item) {
            item.quantity++;
        },
        decreaseQnt (item) {
            item.quantity--;

            if (item.quantity === 0) {
                this.basket.splice(this.basket.indexOf(item), 1)
            }
        }
    },
    computed: {
        menuItems() {
            return this.$store.getters.getMenuItems
        },
        subTotal () {
            var subCost = 0;
            for(var items in this.basket) {
                var individualItem = this.basket[items];
                subCost += individualItem.quantity * individualItem.price;
            }
            return subCost
        },
        total () {
            var deliveryPrice = 100;
            var totalCost = this.subTotal;
            return deliveryPrice + totalCost
        },
    }
  }
</script>

<style lang="scss" scoped>
h1{
    margin-top: 50px;
}
#info {
    background: #fff;
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
</style>