<template>
  <v-container>
    <v-row>
        <v-col md='4' offset-md='4'>
            <v-form @submit.prevent='login' >
                <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                required
                ></v-text-field>

                <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
                ></v-text-field>



                <v-btn
                color="success"
                type="submit"
                >
                Login
                </v-btn>

            </v-form>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
      data() {
          return {
              form: {
                  email: null,
                  password: null
              }
          }
      },
      methods: {
          login() {
              User.login(this.form);
          }
      }
  }
</script>

