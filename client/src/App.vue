<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/nasa_logo.png"
          transition="scale-transition"
          width="80"
        />
        <h1>
          Astronomy pictures
        </h1>
      </div>
    </v-app-bar>

    <v-main class="px-2 mt-5">
      <div class="filters mb-3">
        <v-text-field
          v-model="filters.search"
          outlined dense hide-details
          label="Search"
        />
        <q-date-picker
          v-model="filters.startDate"
          outlined dense hide-details clearable
          label="Start Date"
        />
        <q-date-picker
          v-model="filters.endDate"
          outlined dense hide-details clearable
          label="End Date"
        />
        <v-btn @click="search" color="primary">Search</v-btn>
      </div>
      <v-row>
        <v-col :cols="3" v-for="(item, ix) in items" :key="ix">
          <v-card>
            <v-img v-if="item.media_type == 'image'" :src="item.url"></v-img>
            <iframe v-else :src="item.url"
              title="YouTube video player" frameborder="0"
              style="width: 100%; height: 300px"
              allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
            <div class="text-right date">
              {{item.date}}
            </div>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>{{item.explanation.substr(0, 600)}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        :length="pages"
        class="mt-2"
      ></v-pagination>
    </v-main>
  </v-app>
</template>

<script>
import QDatePicker from './components/QDatePicker'
import moment from 'moment'
export default {
  name: 'App',

  components: {
    QDatePicker,
  },

  data: () => ({
    items: [],
    filters: {
    },
    page: 1,
    pages: 1,
  }),
  mounted(){
    this.getItems()
  },
  watch: {
    page(){
      this.getItems()
    },
  },
  methods: {
    getItems() {
      let filtersStr = ''
      if(this.filters.startDate){
        filtersStr += '&startDate=' + moment(this.filters.startDate).format('YYYY-MM-DD')
      }
      if(this.filters.endDate){
        filtersStr += '&endDate=' + moment(this.filters.endDate).format('YYYY-MM-DD')
      }
      if(this.filters.search){
        filtersStr += '&search=' + this.filters.search
      }
      this.$http.get('' + this.page + '?' + filtersStr)
        .then(res => {
          this.items = res.data.items
          this.pages = res.data.pages
        })
    },
    search(){
      this.page = 1
      this.getItems()
    },
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: TiroKannada;
  src: url(./assets/fonts/TiroKannada.ttf);
}
h1{
  font-family:TiroKannada;
}
.filters{
  display: inline-flex;
  gap: 10px;
}
.date{
  position: absolute;
  right: 10px;
  font-size: .9em;
  color: grey;
}
</style>