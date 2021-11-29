<template>
  <v-card class="pa-4">
    <v-card-title class="text-h4">
      Vytvoriť novú reklamu
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="link"
        label="Link"
        :rules="[rules.required, rules.counter]"
        maxlength="255"
        counter
      />
      <v-file-input
        v-model="image"
        accept="image/*"
        label="Obrázok reklamy"
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
    name: 'AddCreate',
    props:{
      dialog:{
        type: Boolean,
        default: false
      }
    },
    data:() => ({
        link: "",
        image: null,
        rules:{
          required: value => !!value || 'Potrebné pole',
          counter: value => value.length <= 255 || 'Max 255 znakov',
          isPrice: value =>  /^-?\d*\.?\d*$/.test(value) || 'Musí byť platná cena'
          
        }
    }),
    computed: {
        canCreate() {
            return this.link.length> 0 && this.link.length <= 255 && this.image
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.link = '';
                this.image = null;
            }
        },
    },
    methods:{
        async create(){
            const formData = new FormData();
            formData.append('image', this.image);
            console.log(this.image)
            const raw_1 = await fetch('http://localhost:5050/advertisement/image', {
                method: 'POST',
                body: formData
            });
            const data_1 = await raw_1.json();
            console.log(data_1);


            const raw_2 = await fetch('http://localhost:5050/advertisement/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  link: this.link,
                  image: this.image.name
                })
            })
            const data_2 = await raw_2.json()
            console.log(data_2)
            this.$emit('created', {
              link: this.link,
            })

        },
        close(){
            this.$emit('close')
        }
    }
}
</script>