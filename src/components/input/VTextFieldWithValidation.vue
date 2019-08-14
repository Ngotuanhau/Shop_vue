<template>
  <ValidationProvider :rules="rules" :name="$attrs.label">
    <v-text-field
      slot-scope="{ errors, valid }"
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
      dark
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider
  },

  props: {
    rules: {
      type: [Object, String],
      value: null
    },
    value: {
      type: null
    }
  },

  data() {
    return {
      innerValue: null
    };
  },

  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit("input", newVal);
    },

    value(newVal) {
      this.innerValue = newVal;
    }
  },

  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style>
</style>
