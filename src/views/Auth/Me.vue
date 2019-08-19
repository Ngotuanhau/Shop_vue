<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm9 md7>
        <v-card v-for="(item, index) in userData" :key="index">
          <v-flex class="c-me_content">
            <div xs12 md2>
              <div class="c-avarta">
                <v-icon>$vuetify.icons.account</v-icon>
              </div>
            </div>
            <v-spacer></v-spacer>
            <div sx12 md4>
              <v-card-title class="mb-8">
                <span>Full Name: {{item.fullname}}</span>
              </v-card-title>
              <v-card-title class="mb-8">
                <span>User Name: {{item.username}}</span>
              </v-card-title>
              <v-card-title class="mb-8">
                <span>Phone Number: {{item.phone}}</span>
              </v-card-title>
              <v-card-title class="mb-8">
                <span>Email Address: {{item.email}}</span>
              </v-card-title>
              <v-card-title class="mb-8">
                <span>Address: {{item.address}}</span>
              </v-card-title>
            </div>
          </v-flex>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userData: []
    };
  },

  methods: {
    get_Profile() {
      axios.get("/account/me").then(response => {
        console.log(response);
        this.userData = response.data;
      });
    }
  },

  created() {
    this.get_Profile();
  }
};
</script>

<style lang="scss" scoped>
.c-me_content {
  display: flex;
}
.c-profile {
  border: 1px solid black;
  height: 100%;
}

.c-avarta {
  display: flex;
  justify-content: center;
  border: 1px solid black;
  height: 200px;
  width: 200px;
}
</style>