<template>
  <v-card class="ma-4">
    <v-card-title>
      Objednávka ID: {{ order.id }}
    </v-card-title>
    <v-card-subtitle>Zákaznik: {{ userFullName }}</v-card-subtitle>
    <v-card-text>
      <span class="total">Celková cena: {{ order.total_price }} EUR</span><br>
      <details>
        <summary>Objednané veci:</summary>
        <span
          v-for="product in order.products"
          :key="product.id"
        >{{ product.order_product.amount }} x {{ product.product_name }} - {{ product.price }} EUR<br></span>
      </details>
      <span class="text-h5">Status: {{ orderStatus }}</span>
    </v-card-text>
        
    <v-card-actions>
      <v-col class="text-right">
        <v-btn
          v-if="order.status === 'paid'"
          class="mr-2"
          color="success"
          @click="updateOrderStatus('on_way')"
        >
          Odoslať objednávku
        </v-btn>
        
        <v-btn
          v-if="order.status === 'on_way'"
          class="mr-2"
          color="success"
          @click="updateOrderStatus('delivered')"
        >
          Označiť ako vybavené
        </v-btn>
        <v-btn
          v-if="order.status !== 'delivered'"
          class="mr-2"
          color="purple"
          dark
          @click="updateOrderStatus('canceled')"
        >
          Zrušiť objednávku
        </v-btn>
        <v-btn
          class="mr-2"
          float="right"
          color="error"
          @click="$emit('delete')"
        >
          Zmazať
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
    name: 'Order',
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    computed:{
        userFullName(){
            console.log(this.order)
            return this.order?.user?.first_name + ' ' + this.order?.user?.last_name;
        },
        orderStatus(){
            switch(this.order.status){
                case 'paid':
                    return 'Objednávka je zaplatená';
                case 'on_way':
                    return 'Je na ceste';
                case 'canceled':
                    return 'Objednávka je zrušená';
                case 'delivered':
                    return 'Objednávka je doručená';
                default:
                    return 'Objednávka je neznáma';
            }
        }
    },
    methods:{
        async updateOrderStatus(status){
            const raw = await fetch('http://localhost:5050/order',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.order.id,
                    status: status
                })
            });
            const data = await raw.json();
            console.log(data);
            this.$emit('update');
        }

    }
}
</script>
<style scoped>
.total{
    font-weight: bold !important;
    text-decoration: underline !important;
}
</style>