<template>
  <v-container>
    <v-row>
      <v-col class="text-h2">
        Ďakujeme za nákup, tu je vaša reklama :)
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <add
          :image="image"
          :link="link"
          :counter="counter"
          @clicked="transfer"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Add from '@/components/Add.vue'
export default {
    name: 'AddView',
    components: {
        Add
    },
    data:()=>({
        link: "",
        counter: 0,
        image: "",
        id: 0
    }),
    async mounted() {
        const raw = await fetch('http://localhost:5050/advertisement')
        const data = await raw.json()
        this.image = data.image
        this.id = data.id
        this.counter = data.counter
        this.link = data.link
    },
    methods: {
        async transfer(){
            window.open(this.link, "_blank");
            await fetch('http://localhost:5050/advertisement',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id
                })
            })
            this.$router.push('/')
        }
    }

}
</script>

<style>

</style>