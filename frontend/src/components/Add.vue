<template>
  <v-card>
    <v-card-title v-if="mode==='edit'">
      Počet otvorení: {{ counter }}
    </v-card-title>
    <v-card-text>
      <img
        :src="fullImage"
        alt="link"
        width="250"
        @click="$emit('clicked')"
      >
    </v-card-text>
    <v-card-actions>
      <v-text-field
        v-model="l_link"
        class="ml-4"
      />
      <v-spacer />
      <v-btn
        v-if="mode=='edit'"
        class="mr-4"
        color="primary"
        text
        @click="$emit('save', l_link)"
      >
        <v-icon>mdi-content-save</v-icon>
        Uložiť zmeny
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    name: 'Add',
    props: {
        link: {
            type: String,
            required: true
        },
        counter: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        mode:{
            type: String,
            default: 'view'
        }
    },
    data:function(){
        return{
            l_link: this.link
        }   
    },
    computed:{
        fullImage(){
            return this.image ?"http://localhost:5050/adds/"+this.image : "https://i.stack.imgur.com/MEBIB.gif";
        }
    },

}
</script>

<style>

</style>