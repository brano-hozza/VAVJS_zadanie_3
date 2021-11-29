<template>
  <v-card class="ma-4">
    <v-card-title>
      Zákazník ID {{ user.id }}
    </v-card-title>
    <v-card-subtitle>Email: {{ user.email }}</v-card-subtitle>
    <v-card-text>{{ user.first_name }} {{ user.last_name }}</v-card-text>
    <v-card-actions>
      <v-col class="text-right">
        <v-btn
          float="right"
          color="error"
          @click="$emit('delete')"
        >
          DELETE
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
    name: 'User',
    props:{
        user: {
            type: Object,
            required: true
        }
    },
    
}
</script>
