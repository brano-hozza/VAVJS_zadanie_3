<template>
  <v-app>
    <v-app-bar
      app
      color="success"
      dark
    >
      <v-toolbar-title>
        <span
          class="headline"
          @click="$route.name !== 'Home' && $router.push('/')"
        ><v-icon
          color="white"
          class="mr-2"
        >mdi-flower</v-icon>Záhradnícke potreby</span>
      </v-toolbar-title>

      <v-spacer />
      <v-icon
        class="mr-4"
        @click="toggleDarkMode"
      >
        mdi-theme-light-dark
      </v-icon>
      <template v-if="adminPath($route.path)">
        <v-btn
          v-if="adminPath($route.path) && $route.name !== 'AdminUsers'"
          class="mx-2"
          @click="$router.push('/admin')"
        >
          Zákazníci
        </v-btn>
        <v-btn
          v-if="adminPath($route.path) && $route.name !== 'AdminOrders'"
          class="mx-2"
          @click="$router.push('/admin/orders')"
        >
          Objednávky
        </v-btn>
        <v-btn
          v-if="adminPath($route.path) && $route.name !== 'AdminProducts'"
          class="mx-2"
          @click="$router.push('/admin/products')"
        >
          Produkty
        </v-btn>
        <v-btn
          v-if="adminPath($route.path) && $route.name !== 'AdminAdd'"
          class="mx-2"
          @click="$router.push('/admin/adds')"
        >
          Reklamy
        </v-btn>
      </template>
      <template v-else>
        <a
          v-if="cart.length > 0"
          class="white-link"
          @click="$route.name !== 'Cart' && $router.push('/cart')"
        ><v-icon
          color="white"
          class="mr-2"
        >mdi-cart</v-icon> Počet produktov: {{ itemAmount }} ks</a>
        <span v-else>
          <v-icon
            color="white"
            class="mr-2"
          >mdi-cart-outline</v-icon>
          Prázdny košík
        </span>
      </template>
    </v-app-bar>

    <v-main>
      <router-view
        @update-cart="updateCart"
        @alert="createAlert"
      />
      <v-snackbar
        v-for="alert in alerts"
        :key="alert.id"
        v-model="alert.show"
        color="deep-purple accent-4"
      >
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="alert.show = false"
          >
            Close
          </v-btn>
        </template>
        {{ alert.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>

import { isAdminPath} from './router/index.js'

export default {
  name: 'App',

  data: () => ({
    cart: [],
      alerts:[]
  }),
  computed: {
    itemAmount(){
      return this.cart.reduce((acc, item) => acc + item.amount, 0)
    }
  },
  mounted() {
    this.updateCart()
  },
  methods: {
    adminPath(path) {
      return isAdminPath(path)
    },
    updateCart(){
      const cart = localStorage.getItem('cart') || '[]';
      this.cart = JSON.parse(cart);
    },
    createAlert(message){
        const id = '_' + Math.random().toString(36).substr(2, 9);
        this.alerts.push({
          id,
          show:true,
          message
        })
        setTimeout(()=>{
          this.alerts.splice(id,1)
        },4000)
    },
    toggleDarkMode(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
};
</script>
<style>
.headline{
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
}
.float-lower {
  margin-bottom: 50px !important;
}
.white-link {
  color: white !important;
}
</style>