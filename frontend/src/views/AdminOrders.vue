<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2">
            Objednávky
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <order
            v-for="order in orders"
            :key="`order-${order.id}`"
            :order="order"
            @delete="deleteOrder(order.id)"
            @update="fetchOrders"
          />
        </v-col>
      </v-row>
    </v-container>
  
    <v-btn
      elevation="10"
      class="float-lower"
      color="pink"
      fab
      big
      large
      absolute
      fixed
      bottom
      right
      @click="createDialog = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="createDialog"
      style="width:70%"
    >
      <OrderCreate
        :dialog="createDialog"
        :users="users"
        :products="products"
        @close="createDialog = false"
        @created="created"
      />
    </v-dialog>
  </div>
</template>

<script>
import Order from '@/components/Order'
import OrderCreate from '@/components/OrderCreate'

  export default {
    name: 'AdminOrders',

    components: {
      Order,
      OrderCreate
    },
    data:()=>({
      orders:[],
      users:[],
      products:[],
      createDialog: false,
    }),
    mounted() {
      this.fetchOrders()
      this.fetchProducts()
      this.fetchUsers()
    },
    methods:{
      async fetchOrders(){
        const raw_data = await fetch('http://localhost:5050/orders');
        const data = await raw_data.json();
        this.orders = data;
      },
      update(){
        this.$emit('alert', "Objednávka upravená");
        this.fetchOrders();
      },
  
      async fetchProducts(){
        const raw_data = await fetch('http://localhost:5050/products');
        const data = await raw_data.json();
        this.products = data;
      },

      async fetchUsers(){
        const raw_data = await fetch('http://localhost:5050/users');
        const data = await raw_data.json();
        this.users = data;
      },
      created(data){
        this.createDialog = false
        this.$emit('alert',`Objednávka bola vytvorená (Počet produktov: ${data.length}).` )
        this.fetchOrders()
      },
      async deleteOrder(id){
        await fetch(`http://localhost:5050/order/${id}`,{
          method:'DELETE'
        });
        this.fetchOrders();
      }
    }
  }
</script>
