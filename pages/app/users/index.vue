<template>
  <v-layout>
    <!--    {{ users }}-->
    <v-flex xs12>
      <v-card class="ma-2">
        <v-card-title>
          All Users
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
        >

          <template v-slot:item._id="{ item }">
            <v-btn rounded class="primary" :to="`/app/users/${item._id}`"><v-icon left>mdi-account-edit</v-icon>Edit</v-btn>
          </template>

        </v-data-table>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    name: "index",
    layout: "dashboard",
    async asyncData({app}) {
      let users = await app.$axios.$get("/users");

      return {
        users: users.users
      }
    },
    data() {
      return {
        search: "",
        headers: [
          {
            text: 'Name',
            align: 'center',
            sortable: false,
            value: 'name',
          }, {
            text: 'Username',
            align: 'center',
            sortable: false,
            value: 'username',
          }, {
            text: 'Credits',
            align: 'center',
            sortable: true,
            value: 'balance',
          }, {
            text: 'Actions',
            align: 'center',
            sortable: false,
            value: '_id',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
