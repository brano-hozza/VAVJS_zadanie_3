<template>
  <v-card class="pa-4">
    <v-card-title class="text-h3">
      Vytvorenie novej objednavky
    </v-card-title>

    <v-card-text>
      <v-select
        v-model="user_id"
        :items="users.map(({id, first_name, last_name})=>({
          text: `${id}.) ${first_name} ${last_name}`,
          value: id,
          disabled: false,
        }))"
        label="Zákazník"
      />
      <v-select
        v-model="products_ids"
        :items="products.map(({id, product_name, price})=>({
          text: `${product_name} -> ${price}$`,
          value: id,
          disabled: false,
        }))"
        label="Produkty"
        multiple
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn
        text
        @click="close"
      >
        Zrušiť
      </v-btn>

      <v-btn
        color="primary"
        text
        :disabled="!canCreate"
        @click="create"
      >
        Vytvoriť
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
    name: 'OrderCreate',
    props:{
        users: {
            type: Array,
            required: true,
        },
        products: {
            type: Array,
            required: true,
        },
        dialog: {
            type: Boolean,
            default: false,
        },
    },
    data:() => ({
        user_id: null,
        products_ids: [],
    }),
    computed: {
        canCreate() {
            return this.user_id !== null && this.products_ids.length > 0;
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.products_ids = [];
                this.user_id = null;
            }
        },
    },
    methods:{
        async create(){
            const raw = await fetch('http://localhost:5050/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: this.user_id,
                    products: this.products_ids,
                })
            })
            const data = await raw.json()
            console.log(data)
            this.$emit('created', this.products_ids)

        },
        close(){
            this.$emit('close')
        }
    }
}
</script>