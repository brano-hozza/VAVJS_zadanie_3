<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h2">
          Košík
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="product in cart"
        :key="'product-'+product.id"
        cols="4"
      >
        <product
          :product="product"
          mode="pay"
          @remove="remove(product.id)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          block
          color="primary"
          :disabled="!hasItems"
          @click="$router.push('/pay')"
        >
          <v-icon class="ml-2">
            mdi-arrow-right-thin
          </v-icon>
          Prejsť na platbu
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/Product.vue'
export default {
    name: 'Cart',
    components: {
        Product
    },
    data: ()=> ({
        cart: []
    }),
    computed:{
        hasItems(){
            return this.cart.length > 0
        }
    },
    mounted() {
        const cart = localStorage.getItem('cart') ?? '[]';
        this.cart = JSON.parse(cart);

    },
    methods: {
        remove(id) {
            this.cart = this.cart.reduce((acc, product) => {
                if (product.id !== id) {
                    return [...acc, product];
                }
                if(product.amount > 1){
                    product.amount--;
                    return [...acc, product];
                }
                return acc;
            }, []);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.$emit('update-cart');
            this.$emit('alert', 'Produkt bol odstráneny z košíka')
        }
    }

}
</script>

<style>

</style>