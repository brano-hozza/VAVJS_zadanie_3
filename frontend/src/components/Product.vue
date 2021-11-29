<template>
  <v-card class="ma-4">
    <v-card-title>
      {{ product.product_name }}
    </v-card-title>
    <v-card-subtitle>ID: {{ product.id }}</v-card-subtitle>
    <v-card-text>
      <template v-if="mode==='pay'">
        Počet kusov: {{ product.amount }}ks<br>
      </template>
      Cena: {{ product.price }} Eur<br>
      Popis: {{ product.description }}<br>
      <img
        :src="'http://localhost:5050/images/'+product.image"
        :alt="product.product_name"
        width="250"
      >
    </v-card-text>
    <v-card-actions>
      <v-col class="text-right">
        <v-btn
          v-if="mode === 'edit'"
          float="right"
          color="error"
          @click="$emit('delete')"
        >
          DELETE
        </v-btn>
        <v-btn
          v-if="mode === 'pay'"
          float="right"
          color="error"
          @click="$emit('remove')"
        >
          <v-icon class="mr-2">
            mdi-cart-remove
          </v-icon>
          Odstrániť z košíka
        </v-btn>
        <v-btn
          v-if="mode === 'view'"
          block
          float="right"
          color="success"
          @click="$emit('buy')"
        >
          <v-icon
            color="white"
            class="mr-2"
          >
            mdi-cart-arrow-down
          </v-icon>
          Vložiť do košíka
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true
        },
        mode: {
            type: String,
            default: 'view'
        }
    },
}
</script>
