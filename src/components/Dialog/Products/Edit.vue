<template>
  <v-layout row justify-center>
    <v-dialog :value="value" @input="$emit('input', $event)" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Object Type</span>
        </v-card-title>
        <v-form ref="form">
          <v-card-text>
            <v-container>
              <v-layout column class="create_form">
                <v-flex>
                  <span>Type Slug *</span>
                  {{editData.radioGroup}}
                  <v-radio-group v-model="editData.radioGroup" d-flex row>
                    <v-radio
                      v-for="(item, index) in editData.radioGroup"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editData.title" label="Title*"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="editData.slug" label="Slug*"></v-text-field>
                </v-flex>
                <v-flex>
                  <span class="sp_content">Content</span>
                  <v-vue-editor v-model="editData.content"></v-vue-editor>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$emit('input', false)">Close</v-btn>
            <v-btn color="blue darken-1" text @click.prevent="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    value: false,
    item: {}
  },
  data() {
    return {
      editData: {}
    };
  }
};
</script>

<style>
</style>