<template>
  <div>
    <v-menu
      ref="datePickerMenu"
      :close-on-content-click="false"
      v-model="datePickerMenu"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-on="on"
          v-model="dateFormatted"
          :label="pickerLabel"
          @blur="date = parseDate(dateFormatted)"
          v-bind="$attrs"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date"
        :min="min" :max="max"
        v-on="listeners"
        no-title @input="input"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
  import moment from 'moment'
  // import _ from "lodash"

  export default {
    props: {
      label: String,
      value: String,
      inner: Boolean,
      min: String,
      max: String,
    },
    data: () => ({
      datePickerMenu: false,
      date: null,
      dateFormatted: null,
    }),
    watch: {
      date: function (val) {
        // console.log("watch date");
        this.dateFormatted = this.formatDate(this.date);
        this.$emit('input', val);
      },
      value: function (val) {
        // console.log("watch val");
        this.date = val;
      },
    },
    computed: {
      pickerLabel() {
        if(this.label === '')
          return ''
        return this.label || "Date";
      },
      listeners() {
        const { ...listeners } = this.$listeners;
        return listeners;
      },
    },
    methods: {
      input() {
        this.datePickerMenu = false
        this.$emit('input', this.date)
      },
      //TODO: Send to q-datepicker
      formatDate (date) {
        // console.log("formatDate");
        if (!date) return null;
        return moment(String(date)).format('MMM D, YYYY');
      },
      parseDate (date) {
        // console.log("parseDate");
        if (!date) return null;
        let compatibleFormats = ["YYYY-MM-DD", "MMM D, YYYY", "MMM/D/YYYY", "MM-D-YYYY",];
        return moment(date, compatibleFormats)
          .format('YYYY-MM-DD');
      },
    },
    created() {
      if (this.value) {
        this.date = this.parseDate(this.value);
      }
    },
   }
</script>

<style scoped lang="scss">

</style>