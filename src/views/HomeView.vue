<template>
  <!-- <hello-world /> -->
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-card color="orange" dark>
          <v-card-title>Blog Name</v-card-title>
          <v-card-text>Blog Content</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "../components/HelloWorld.vue";

export default Vue.extend({
  name: "Home",

  components: {
    HelloWorld,
  },
});
</script>
