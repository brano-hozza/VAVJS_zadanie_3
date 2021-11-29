<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2">
            Reklamy
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <add
            v-for="add in adds"
            :key="`add-${add.id}`"
            :link="add.link"
            :counter="add.counter"
            :image="add.image"
            mode="edit"
            @save="(l_link) => save(add.id, l_link)"
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
      <AddCreate
        :dialog="createDialog"
        @close="createDialog = false"
        @created="created"
      />
    </v-dialog>
  </div>
</template>

<script>
import Add from '@/components/Add'
import AddCreate from '@/components/AddCreate'

  export default {
    name: 'AdminAdd',

    components: {
      Add,
      AddCreate
    },
    data:()=>({
      adds:[],
      createDialog: false,
    }),
    mounted() {
      this.fetchAdds()
    },
    methods:{
      async fetchAdds(){
        const raw_data = await fetch('http://localhost:5050/advertisements');
        const data = await raw_data.json();
        this.adds = data;
      },
      created(){
        this.createDialog = false
        this.$emit('alert',`Reklama bola vytvorená` )
        this.fetchAdds()
      },
      async deleteAdd(id){
        await fetch(`http://localhost:5050/product/${id}`,{
          method:'DELETE'
        });
        this.fetchAdds();
      },
      async save(id, link){
        const raw = await fetch(`http://localhost:5050/advertisement/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            link:link
          })
        });
        const data = await raw.json();
        this.fetchAdds();
        this.$emit('alert',`Reklama bola upravená` );
      }
    }
  }
</script>
