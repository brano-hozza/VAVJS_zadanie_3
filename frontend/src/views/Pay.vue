<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h2">
          Platba
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Informácie o používateľovi</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field 
                  v-model="first_name" 
                  label="Meno" 
                  counter 
                  maxlength="255" 
                  :rules="[rules.required, rules.counter]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="last_name"
                  label="Priezvisko"
                  counter 
                  maxlength="255" 
                  :rules="[rules.required, rules.counter]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="email"
                  label="Email"
                  counter 
                  maxlength="255" 
                  :rules="[rules.required, rules.counter, rules.email]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="phone"
                  label="Tel. číslo"
                  counter 
                  maxlength="10" 
                  :rules="[rules.required, rules.counter, rules.phone_number]"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Fakturačná adresa</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="city"
                  label="Mesto"
                  counter 
                  maxlength="255" 
                  :rules="[rules.required, rules.counter]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="street"
                  label="Ulica"
                  counter 
                  maxlength="255" 
                  :rules="[rules.required, rules.counter]"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="zip"
                  label="PSČ"
                  counter 
                  maxlength="5" 
                  :rules="[rules.required, rules.counter, rules.zip]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="text-h4 green--text text--darken-1"
      >
        Celková suma: {{ total.toFixed(2) }} EUR
      </v-col>
      <v-col>
        <v-btn
          color="primary"
          block
          @click="pay"
        >
          <v-icon class="mr-2">
            mdi-cash
          </v-icon>
          Zaplatiť
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Pay',
    data: ()=>({
        first_name:"",
        last_name:"",
        email:"",
        phone:"",
        street:"",
        city:"",
        zip:"",
        rules:{
          required: value => !!value || 'Potrebné pole',
          counter: value => value.length <= 255 || 'Max 255 znakov',
          phone_number: value => /^09[\d]{8}$/.test(value) || 'Telefónne číslo musí mať 10 číslic (09XX XXX XXX)',
          email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Neplatný email',
          zip: value => /^[\d]{5}$/.test(value) || 'Neplatné PSČ',
        }
    }),
    computed: {
        total(){
            const cart = localStorage.getItem('cart') || '[]';
            const cart_items = JSON.parse(cart);
            return cart_items.reduce((acc, item)=>{
                return acc + item.price * item.amount;
            }, 0);
        }
    },
    methods: {
        async pay(){
            const cart = localStorage.getItem('cart') || '[]';
            const cart_items = JSON.parse(cart);
            const order = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phone: this.phone,
                street: this.street,
                city: this.city,
                zip: this.zip,
                products: cart_items.reduce((acc, item)=>{
                    acc.push({
                            id:item.id,
                            amount: item.amount,
                            price: item.price
                        });
                    return acc;
                }, [])
            };
            const raw = await fetch('http://localhost:5050/pay',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })
            if(raw.status === 200){
                localStorage.removeItem('cart');
                this.$emit('alert','Objednávka úspešne prebehla')
                this.$emit('update-cart')
                return this.$router.push('/add');
            }
            this.$emit('alert','Objednávka neprebehla')

        }
    }

}
</script>

<style>

</style>