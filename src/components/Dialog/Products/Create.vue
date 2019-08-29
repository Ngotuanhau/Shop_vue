<template>
  <v-layout>
    <v-dialog
      :value="value"
      @input="$emit('input', $event)"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="brown lighten-4">
          <v-btn icon @click="$emit('input', false)">
            <v-icon color="brown lighten-1">$vuetify.icons.close</v-icon>
          </v-btn>
          <v-toolbar-title style="color:#8D6E63">New Product</v-toolbar-title>
        </v-toolbar>

        <v-form ref="form">
          <v-card-text>
            <v-container>
              <v-layout wrap class="create_form">
                <v-flex>
                  <span>Categories *</span>
                  {{selected}}
                  <v-flex d-flex row pa-2 ma-0>
                    <v-checkbox
                      v-for="(item, index) in categories"
                      :key="index"
                      :label="item.name"
                      :value="item"
                      v-model="selected"
                      class="c-checkbox"
                    ></v-checkbox>
                  </v-flex>
                </v-flex>
                <v-flex>
                  <span>Name Product *</span>
                  <v-text-field v-model="name" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Slug *</span>
                  <v-text-field v-model="slug" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Short Description *</span>
                  <v-text-field v-model="short_description" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Sku *</span>
                  <v-text-field v-model="sku" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Price *</span>
                  <v-text-field v-model="price" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Sale Price *</span>
                  <v-text-field v-model="sale_price" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span>Quantity *</span>
                  <v-text-field v-model="stock_quantity" single-line solo></v-text-field>
                </v-flex>
                <v-flex>
                  <span class="sp_content">Description</span>
                  <v-vue-editor v-model="description"></v-vue-editor>
                </v-flex>

                <!-- <v-flex class="uploadfile">
                  <span>Upload</span>
                  <input
                    type="file"
                    ref="files"
                    multiple
                    accept="image/*"
                    @change="handleChange"
                    style="display:none"
                  />
                  <v-btn class="btn_upload" @click="$refs.files.click() ">
                    <v-icon class="btn_icon">$vuetify.icons.plus</v-icon>
                  </v-btn>
                  <v-layout row wrap>
                    <v-flex xs4 d-flex v-for="(file, index) in files" :key="index">
                      <img width="100%" class="preview" :ref="`image${index}`" />
                    </v-flex>
                  </v-layout>
                </v-flex>-->
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="brown lighten-1" text @click="$emit('input', false)">Close</v-btn>
            <v-btn color="brown lighten-1" text @click.prevent="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    value: false
  },

  data() {
    return {
      name: "",
      slug: "",
      short_description: "",
      sku: "",
      price: "",
      sale_price: "",
      stock_quantity: "",
      description: "",
      categories: [],
      selected: []
    };
  },

  watch: {
    dialog_create: {
      immediate: true,
      handler(val) {
        if (this.$emit("input", false)) {
          this.getCategories().then(data => {
            this.categories = data.items;
            console.log(this.categories);
          });
        }
      },
      deep: true
    }
  },

  methods: {
    getCategories() {
      return new Promise((resolve, reject) => {
        const response = axios.get("/categories").then(response => {
          let items = response.data;
          const total = items.length;
          resolve({ items, total });
        });
      });
    },

    submit() {
      const product = {
        name: this.name,
        slug: this.slug,
        short_description: this.short_description,
        sku: this.sku,
        price: this.price,
        sale_price: this.sale_price,
        stock_quantity: this.stock_quantity,
        description: this.description,
        categories: this.selected
      };
      console.log(product);
      // this.$store.dispatch("addProduct", product);
      // let products = this.$store.state.Products.products;
      // console.log(products);
      axios.post("/products", product).then(response => {
        console.log(response);
      });
      this.$refs.form.reset();
      this.$emit("input", false);
      // this.$store.commit("setProducts", products);
    }
  },

  components: {
    vVueEditor: VueEditor
  }
};
</script>

<style  lang="scss" scoped>
.create_form {
  display: block;
}
.c-checkbox {
  margin-right: 20px;
}
.uploadfile {
  display: grid;
  margin-top: 25px;
}
.btn_upload {
  width: 115px;
  margin-top: 10px;
  padding: 0;
  height: 120px;
  border-style: dashed;
  background-color: #bdbdbd;
  box-shadow: none !important;
  -webkit-box-shadow: none;
}
</style>