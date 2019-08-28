<template>
  <v-container>
    <v-layout column>
      <template>
        <div>
          <v-toolbar flat color="white">
            <template>
              <v-btn color="brown lighten-4" class="mb-2" @click="dialog_create=!dialog_create">
                <span style="color: #8d6e63;">New product</span>
              </v-btn>
            </template>
            <v-text-field
              v-model="search"
              label="Search. . ."
              single-line
              hide-details
              class="pa-5"
            ></v-text-field>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="products"
            :server-items-length="totalProducts"
            :loading="loading"
            :options.sync="options"
            item-key="id"
            :search="search"
            class="elevation-1"
            :mobile-breakpoint="350"
          >
            <template v-slot:item.action="{ item }">
              <v-btn color="brown lighten-4" @click="openEdit(item)">
                <v-icon color="brown lighten-1" small>$vuetify.icons.pencil</v-icon>
              </v-btn>
              <v-btn color="brown lighten-4" @click="openDelete(item)">
                <v-icon color="brown lighten-1" small>$vuetify.icons.delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </div>
        <v-create v-model="dialog_create" />
        <v-delete v-model="dialog_delete" :item="currentItem" />
        <v-edit v-model="dialog_edit" :item="currentItem" />
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import Create from "@/components/Dialog/Products/Create";
import Delete from "@/components/Dialog/Products/Delete";
import Edit from "@/components/Dialog/Products/Edit";
import { setTimeout } from "timers";

export default {
  components: {
    vCreate: Create,
    vDelete: Delete,
    vEdit: Edit
  },

  data() {
    return {
      totalProducts: 0,
      products: [],
      loading: true,
      options: {},
      dialog_create: false,
      dialog_delete: false,
      dialog_edit: false,
      search: "",
      currentItem: {},
      headers: [
        {
          text: "Name",
          value: "name",
          sortable: false
        },
        {
          text: "Action",
          value: "action",
          sortable: false,
          align: "center"
        }
      ]
    };
  },

  watch: {
    options: {
      immediate: true,
      handler(val) {
        this.getData().then(data => {
          console.log("watch", data);
          this.products = data.items;
        });
      },
      deep: true
    }
  },

  methods: {
    getData(page) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, descending, page, itemsPerPage } = this.options;
        // console.log(this.options);

        const response = axios.get(`/products?page=${page}`).then(response => {
          // console.log(response);
          let items = response.data.data;
          const total = items.length;
          this.totalProducts = response.data.total;

          // console.log(total);
          if (this.options.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy];
              const sortB = b[sortBy];

              if (descending) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0;
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              }
            });
          }

          if (itemsPerPage > 0) {
            console.log(items);
            let newItems = items.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            );
          }

          setTimeout(() => {
            this.loading = false;
            resolve({ items, total });
          }, 1000);
        });
      });
    },

    openDelete(item) {
      this.currentItem = item;
      this.dialog_delete = true;
    },

    openEdit(item) {
      this.currentItem = item;
      this.dialog_edit = true;
    }
  }
};
</script>

<style scoped>
</style>