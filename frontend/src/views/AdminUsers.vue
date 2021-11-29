<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-h2">
            Zákazníci
          </h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <user
            v-for="user in users"
            :key="`user-${user.id}`"
            :user="user"
            @delete="deleteUser(user.id)"
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
      <UserCreate
        :dialog="createDialog"
        @close="createDialog = false"
        @created="created"
      />
    </v-dialog>
  </div>
</template>

<script>
import User from '@/components/User'
import UserCreate from '@/components/UserCreate'

  export default {
    name: 'AdminUsers',

    components: {
      User,
      UserCreate
    },
    data:()=>({
      users:[],
      createDialog: false,
    }),
    mounted() {
      this.fetchUsers()
    },
    methods:{
      async fetchUsers(){
        const raw_data = await fetch('http://localhost:5050/users');
        const data = await raw_data.json();
        this.users = data;
      },
      created(data){
        this.createDialog = false
        this.$emit('alert',`Používateľ ${data.first_name} ${data.last_name} bol vytvorený` )
        this.fetchUsers()
      },
      async deleteUser(id){
        await fetch(`http://localhost:5050/user/${id}`,{
          method:'DELETE'
        });
        this.fetchUsers();
      },
    }
  }
</script>
