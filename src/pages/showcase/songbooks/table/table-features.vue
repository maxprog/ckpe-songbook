<template>
  <q-page padding class="docs-table">

    <!--
<q-page-sticky position="top-right" :offset="[10, 10]">
      <q-fab
        icon="settings"
        direction="left"
        color="primary"
      >

 <q-fab-action v-if="($q.fullscreen && $q.fullscreen.isActive) && $q.theme=='mat'" color="secondary" class="white"
        :icon="($q.fullscreen && $q.fullscreen.isActive) ? 'ion-arrow-expand' : 'fullscreen'"
          @click="toggleFullscreen()"
        />

        <q-fab-action  color="blue" class="white"
         :icon="!dark ? 'ion-ios-list-outline' : 'ion-ios-list'"
          @click="dark  = !dark"
        />
      </q-fab>
    </q-page-sticky>
<br/>

   <p class="caption"></p>
-->

    <q-table
      :data="tableData"
      :columns="columns"
      :filter="filterVal"
      :visible-columns="visibleColumns"
      :separator="separator"
      :pagination.sync="paginationControl"
      row-key="name"
      color="secondary"
      :dark="dark"
      :class="tableClass"
    >
      <template slot="top-left" slot-scope="props">
        <q-search
          hide-underline
          color="secondary"
          v-model="filterVal"
          class="col-6"
          placeholder="Szukaj"
        />
      </template>
      <template slot="top-right" slot-scope="props">
        <!--   <q-table-columns

          color="secondary"
          :dark="dark"
          class="q-mr-sm"
          v-model="visibleColumns"
          :columns="columns"
          label="Kolumny"
        />
        -->
        <q-select
          color="secondary"
          v-model="separator"
          :dark="dark"
          :options="[
            { label: 'Horyzontalnie', value: 'horizontal' },
            { label: 'Wertykalnie', value: 'vertical' },
            { label: 'Komórka', value: 'cell' },
            { label: 'Brak', value: 'none' }
          ]"
          hide-underline
        />

      </template>
      <q-tr slot="body" slot-scope="props" :props="props" @click.native="showSong(props.row)" class="cursor-pointer">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ cutZero(col.value) }}
        </q-td>
      </q-tr>

      <div slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
        <q-btn
          round dense size="sm" icon="undo" color="secondary" class="q-mr-sm"
          :disable="props.isFirstPage"
          @click="props.prevPage"
        />
        <div class="q-mr-sm" style="font-size: small">Strona {{ props.pagination.page }} / {{ props.pagesNumber }}</div>
        <q-btn
          round dense size="sm" icon="redo" color="secondary"
          :disable="props.isLastPage"
          @click="props.nextPage"
        />
      </div>

    </q-table>
    <div class="q-pa-md"/>

    <q-modal v-model="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
            @click="layoutModal = false"
            icon="reply"
            wait-for-ripple
          />
          <q-toolbar-title>
            {{ selectedSong.name }}
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="footer">
          <q-toolbar-title align="center">
            <q-btn color="primary" @click="layoutModal = false" wait-for-ripple label="Zamknij" />
          </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">

          <p v-for="(line,index) in selectedSong.song" :key="index"> {{ line }}</p>
        </div>
      </q-modal-layout>
    </q-modal>

  </q-page>

</template>

<script>
import tableData from 'assets/table-data-ckpe'
import { mapState } from 'vuex'
import { QSpinnerGears } from 'quasar'
import xml2json from 'assets/html2json'
import axios from 'axios'

export default {
  data () {
    return {
      tableData,
      selectedSong: {},
      filterVal: '',
      isOutline: false,
      layoutModal: false,
      count: 0,
      progress: false,
      position: 'bottom',
      songsTableData: [],
      columns: [

        {
          name: 'name',
          label: 'Tytuł',
          align: 'left',
          field: 'name',
          sortable: true
        },

        { name: 'autor', label: 'Autor', field: 'autor', sortable: true }

      ],

      visibleColumns: ['id', 'name'],
      separator: 'horizontal',
      selection: 'multiple',
      pagination: {
        page: 2
      },
      paginationControl: { rowsPerPage: 20, page: 1 },
      loading: false,
      dark: false,
      selectedSecond: [
        { name: 'Eclair' }
      ]
    }
  },
  watch: {

    pageMeta (val) {
      this.reloadData()
    },
    'paginationControl.page' (page) {
      /* this.$q.notify({
        color: 'secondary',
        message: `Przejdz do strony ${page}`,
        actions: page < tableData.length
          ? [{
            label: 'Przejdz do ostatniej strony',
            handler: () => {
              this.paginationControl.page = 4
            }
          }]
          : null
      })
      */
    }
  },
  computed: {
    tableClass () {
      if (this.dark) {
        return 'bg-black'
      }
    },
    drawerState: {
      get () {
        return this.$store.state.showcase.drawerState
      },
      set (val) {
        this.$store.commit('showcase/updateDrawerState', val)
      }
    },
    ...mapState('showcase', [
      'pageMeta'
    ])
  },
  mounted () {
    this.reloadData()
  },
  methods: {
    cutZero (str) {
      return str.replace(/^0+/, '').replace(/^A0+/i, 'A')
    },
    reloadData () {
      this.songsTableData = this.tableData
    },
    showSong (row) {
      var idx = row.id

      this.selectedSong = this.songsTableData.filter((item) => { return item.id === idx })
      this.selectedSong = (this.selectedSong && this.selectedSong.length > 0) ? this.selectedSong[0] : {}
      var filename = `statics/${this.pageMeta.songbook}/${this.selectedSong.id}`

      this.showProgress()
      axios.get(filename).then((response) => {
        if (response && response.data) {
          var json_ = xml2json.parseString(response.data)
          var song = (json_ && json_.song) ? json_.song : {}

          this.selectedSong.song = (song && song.lyrics) ? song.lyrics : ''
          this.selectedSong.song = this.selectedSong.song.replace(/\[V/gi, '[')
          this.selectedSong.song = this.selectedSong.song.replace(/\[C\]/gi, '[Refren]')
          this.selectedSong.song = this.selectedSong.song.split('\n')
          this.hideProgress()
          this.layoutModal = true
        }
        else this.hideProgress()
      }).catch((error) => {
        console.log('Inside error, fetching product line items failed', error)
        this.hideProgress()

        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Bład załadowania pieśni. Wybierz ponownie w razie kolejnych niepowodzeń skontaktuj sie z twórcą aplikacji',
          icon: 'report_problem'
        })
      })
    },
    showProgress (options) {
      options = options || {
        spinner: QSpinnerGears,
        spinnerColor: 'primary',
        message: 'Wyszukiwanie...'
      }
      this.$q.loading.show(options)
    },
    hideProgress () {
      this.$q.loading.hide()
    },

    toggleFullscreen () {
      this.$q.fullscreen.toggle()
    }

  }
}
</script>
