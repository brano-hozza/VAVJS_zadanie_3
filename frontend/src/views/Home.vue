<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h2">
          Produkty
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="product in products"
        :key="'product-'+product.id"
        cols="4"
      >
        <product
          :product="product"
          @buy="buy(product.id)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/Product.vue'
export default {
    name: 'Home',
    components: {
        Product
    },
    data: () => ({
        products:[]
    }),
    mounted() {
      this.fetchProducts()
    },
    
    methods:{
      async fetchProducts(){
        const raw_data = await fetch('http://localhost:5050/products');
        const data = await raw_data.json();
        this.products = data;
      },
      buy(id){
        let cart = localStorage.getItem('cart') || '[]';
        cart = JSON.parse(cart);
        const product = this.products.find(p => p.id === id);
        let item = cart.find(p => p.id === id);
        if(item){
            item.amount++;
        }else{
            product.amount = 1;
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.$emit('update-cart')
        this.$emit('alert',`Produkt s ID ${id} bol pridaný do košíka.`)
      }
    }


}
</script>

<style>

</style>