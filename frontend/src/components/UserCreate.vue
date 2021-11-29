<template>
  <v-card class="pa-4">
    <v-card-title class="text-h3">
      Vytvoriť nového zákazníka
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="first_name"
        label="Krstné meno"
        :rules="[rules.required, rules.counter]"
        maxlength="255"
        counter
      />
      <v-text-field
        v-model="last_name"
        label="Priezvisko"
        :rules="[rules.required, rules.counter]"
        maxlength="255"
        counter
      />
      <v-text-field
        v-model="email"
        label="Email"
        :rules="[rules.required, rules.email]"
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
        first_name: '',
        last_name: '',
        email: '',
        rules:{
          required: value => !!value || 'Potrebné pole',
          counter: value => value.length <= 255 || 'Max 255 znakov',
          email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Neplatný email',
          
        }
    }),
    computed: {
        canCreate() {
            return this.first_name.length > 0 && this.first_name.length <= 255 && this.last_name.length > 0 && this.last_name.length <= 255 && this.email.length > 0 && this.email.length <= 255 && this.isEmail(this.email);
        }
    },
    watch: {
        dialog(val) {
            if (val) {
                this.first_name = '';
                this.last_name = '';
                this.email = '';
            }
        },
    },
    methods:{
        isEmail(email) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        async create(){
            const raw = await fetch('http://localhost:5050/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                })
            })
            const data = await raw.json()
            console.log(data)
            this.$emit('created', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
            })

        },
        close(){
            this.$emit('close')
        }
    }
}
</script>