<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2">
            Produkty
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <product
            v-for="product in products"
            :key="`product-${product.id}`"
            mode="edit"
            :product="product"
            @delete="deleteProduct(product)"
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
      <ProductCreate
        :dialog="createDialog"
        @close="createDialog = false"
        @created="created"
      />
    </v-dialog>
  </div>
</template>

<script>
import Product from '@/components/Product'
import ProductCreate from '@/components/ProductCreate'

  export default {
    name: 'AdminProducts',

    components: {
      Product,
      ProductCreate
    },
    data:()=>({
      products:[],
      createDialog: false,
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
      created(data){
        this.createDialog = false
        this.$emit('alert',`Produkt ${data.name} bol vytvorený` )
        this.fetchProducts()
      },
      async deleteProduct(data){
        await fetch(`http://localhost:5050/product/${data.id}`,{
          method:'DELETE'
        });
        this.$emit('alert',`Produkt ${data.name} bol vymazaný` )
        this.fetchProducts();
      },
    }
  }
</script>
