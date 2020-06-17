<template>
    <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense>
      <!-- <v-app-bar-nav></v-app-bar-nav-icon> -->

      <v-toolbar-title>Draz</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="hidden-sm-and-down">
          <router-link to='/forum'>
              <v-btn>
                  Forum
              </v-btn>
          </router-link>
            <v-btn>
                  Ask Question
            </v-btn>
            <v-btn>
                Category
            </v-btn>
          <router-link to='/login'>
              <v-btn>
                  Login
              </v-btn>
          </router-link>
      </div>
    </v-toolbar>
  </v-card>
</template>


<script>
    export default {

    }
</script>
