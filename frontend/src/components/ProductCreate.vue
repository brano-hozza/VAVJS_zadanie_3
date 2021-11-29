<template>
  <v-card class="pa-4">
    <v-card-title class="text-h4">
      Vytvoriť nový produkt
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="product_name"
        label="Názov produktu"
        :rules="[rules.required, rules.counter]"
        maxlength="255"
        counter
      />
      <v-text-field
        v-model="price"
        label="Cena produktu"
        :rules="[rules.required, rules.isPrice]"
      />
      <v-textarea
        v-model="description"
        label="Popis"
        hint="Popis produktu"
      />
      <v-file-input
        v-model="image"
        accept="image/*"
        label="Obrázok produktu"
        name="image"
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
    name: 'ProductCreate',
    props:{
      dialog: {
        type: Boolean,
        default: false
      }
    },
    data:() => ({
        product_name:"",
        price: 0,
        description: "",
        image: null,
        rules:{
          required: value => !!value || 'Potrebné pole',
          counter: value => value.length <= 255 || 'Max 255 znakov',
          isPrice: value =>  /^-?\d*\.?\d*$/.test(value) || 'Musí byť platná cena'
          
        }
    }),
    computed: {
        canCreate() {
            return this.product_name.length > 0 && this.product_name.length <= 255 && this.isPrice(this.price) && this.image
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.product_name = '';
                this.price = '';
                this.description = '';
                this.image = null
            }
        },
    },
    methods:{
        isPrice(val){
            return /^-?\d*\.?\d*$/.test(val)
        },
        async create(){
            const formData = new FormData();
            formData.append('image', this.image);
            console.log(this.image)
            const raw_1 = await fetch('http://localhost:5050/images', {
                method: 'POST',
                body: formData
            });
            const data_1 = await raw_1.json();
            console.log(data_1);


            const raw_2 = await fetch('http://localhost:5050/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_name: this.product_name,
                    price: this.price,
                    description: this.description,
                    image: this.image.name
                })
            })
            const data_2 = await raw_2.json()
            console.log(data_2)
            this.$emit('created', {
                name: this.product_name,
                price: this.price,
                description: this.description,
            })

        },
        close(){
            this.$emit('close')
        }
    }
}
</script>