<template>
  <q-page padding class="docs-btn row justify-center">
    <div style="width: 500px; max-width: 90vw;">


      <br>
     <q-search  v-model="filterVal"  placeholder="Szukaj"/>
    <br>



   <q-infinite-scroll :handler="refresher">

    <q-btn v-for="(item, index) in ListSongs" :outline="isOutline" push rounded color="primary"
          :class="!shortDescription || filterFullDescription ? 'full-width' : 'btn-fixed-width'"
          :key="`song_${item.id}`"
          :label="!shortDescription || filterFullDescription ? `${cutZero(item.name)}` : `${cutZero(item.id)}`"
          @click="showSong(item.id)"
      />



       <div v-show="!lastPage && this.filterVal.length==0" class="row justify-center" style="margin-bottom: 50px;">
          <q-spinner-dots slot="message" :size="40" />
        </div>

  </q-infinite-scroll>

<q-page-sticky position="bottom-right" :offset="$q.platform.is.ios ? [10, 60] : [10,5]">
        <q-btn
          color="secondary"
          fab
          v-back-to-top.animate="{offset: 500, duration: 200}"
          class="animate-pop"
        >
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-page-sticky>

  <q-page-sticky position="top-right" :offset="[10, 5]">
      <q-fab
        icon="settings"
        direction="left"
        color="secondary"
      >
      <!--
      <q-fab-action v-if="($q.fullscreen && $q.fullscreen.isActive) && $q.theme=='mat'" color="secondary" class="white"
        :icon="($q.fullscreen && $q.fullscreen.isActive) ? 'ion-arrow-expand' : 'fullscreen'"
          @click="toggleFullscreen()"
        />
-->
     <q-fab-action color="secondary" class="white"
        :icon="(!shortDescription) ? 'ion-android-apps' : 'ion-android-menu'"
          @click="shortDescription=!shortDescription"
        />

        <q-fab-action  color="blue" class="white"
         :icon="isOutline ? 'ion-android-checkbox-outline-blank' : 'ion-android-checkbox-blank'"
          @click="isOutline  = !isOutline"
        />
      </q-fab>
    </q-page-sticky>

    </div>


     <q-modal  v-model="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
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
           {{selectedSong.name}}
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="footer">
          <q-toolbar-title align="center">
           <q-btn color="primary" @click="layoutModal = false" wait-for-ripple label="Zamknij" />
          </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <div v-for="line in selectedSong.song">

          <p><div class="inline">{{splitRow(line,0)}}</div><div class="inline float-right">{{splitRow(line,1)}}</div></p>

            </div>
        </div>
      </q-modal-layout>
    </q-modal>


  </q-page>
</template>


<script>
import { QSpinnerFacebook, QSpinnerGears } from 'quasar'
import { mapState } from 'vuex'
import xml2json from 'assets/html2json'
import axios from 'axios'
import ckpeTableData from 'assets/table-data-ckpe'




export default {
  data () {
    return {
      selectedSong: {},
      filterVal:'',
      isOutline:false,
      layoutModal: false,
      ListSongs:[],
      count: 0,
      progress: false,
      position: 'bottom',
      songsTableData:[],
      shortDescription:false,
      filterFullDescription:false,
      pageLength:50,
      page:0,
      lastPage:false

    }
  },
   computed: {
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
  mounted()
  {

   this.reloadData();


  },
   watch: {

    filterVal (val) {


      if (val) {
            this.page=0;
              this.ListSongs=this.filterRecords(val);

              if(val && val.length>0) this.filterFullDescription=true;
              else this.filterFullDescription=false;
       }
      else {

         this.ListSongs = this.songsTableData.slice(0,this.pageLength);
        this.filterFullDescription=false;

      }




    },
    pageMeta(val){

      this.reloadData();

    }
},

  methods: {

    splitRow(str,idx)
    {
     // console.log('str=',str);
      var tab = str.split('#');
      return tab[idx];
    },

    filterRecords(val)
    {


      let items = this.songsTableData.filter((item) => {return val==item.id  || item.name.replace(/^0+/, '').toLowerCase().startsWith(val.toLowerCase()) || item.name.replace(/^0+/, '').toLowerCase().indexOf(val.toLowerCase())!==-1 });
      return items.sort(function(a, b){
              var x = a.id.toLowerCase();
              var y = b.id.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
          });
    },

    refresher (index, done) {
      setTimeout(() => {
        let items = [];
        this.page=this.page+1;
        let positionTo=this.page*this.pageLength;
        let positionFrom=positionTo-this.pageLength;

        if(positionFrom>0 && this.filterVal.length==0)
        {

                items = this.songsTableData.slice(positionFrom,positionTo);
                this.ListSongs = this.ListSongs.concat(items);

                if(items.length<this.pageLength || positionTo==this.songsTableData.length) this.lastPage=true;
                else this.lastPage=false;
        }

        done()
      }, 5)
    },
    cutZero(str)
    {
      return str.replace(/^0+/, '');
    },
closeModal()
{

this.layoutModal=false;
 closeThis();

},
reloadData()
{
 this.songsTableData =  ckpeTableData;


      this.ListSongs = this.songsTableData.slice(0,this.pageLength);

   /*    this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Załadowano pieśni',
              icon: 'report_problem'
            });
            */
},

    showSong(idx){


      this.selectedSong=this.songsTableData.filter((item) => {return item.id==idx });
      this.selectedSong = (this.selectedSong && this.selectedSong.length>0)? this.selectedSong[0]:{};
      var filename = `statics/${this.pageMeta.songbook}/${this.selectedSong.id}`;

this.showProgress();



     axios.get(filename).then((response) => {

       if(response && response.data)
       {
       var json_ = xml2json.parseString(response.data);
       var song = (json_ && json_.song)? json_.song : {};


         this.selectedSong.song =  (song && song.lyrics)? song.lyrics : '';
         this.selectedSong.song = this.selectedSong.song.replace(/\[V/gi,'[');
         this.selectedSong.song = this.selectedSong.song.replace(/\[C\]/gi,'[Refren]');
         this.selectedSong.song = this.selectedSong.song.split('\n');
         this.hideProgress();

         this.layoutModal=true;

      }else  this.hideProgress();

      }).catch((error) => {
         this.hideProgress();

          this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'Bład załadowania pieśni. Wybierz ponownie w razie kolejnych niepowodzeń skontaktuj sie z twórcą aplikacji',
              icon: 'report_problem'
            });

      });




    },
     showProgress (options) {
      options= options || {
          spinner: QSpinnerGears,
          spinnerColor: 'primary',
          message: 'Wyszukiwanie...'
        };
      this.$q.loading.show(options);

    },
     hideProgress () {

        this.$q.loading.hide()

    },
     toggleFullscreen () {
      this.$q.fullscreen.toggle()
    },


    filterSong(idx)
    {

      return (!this.filterVal || this.filterVal=='' || idx==this.filterVal)? 1 : 0;
    },
    alert (mess) {
      this.$q.dialog({
        title: mess
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
  }
}
</script>
<style lang="stylus">

@import '~variables'
.inline
  display inline
.play-backtotop
  color white
  position fixed
  left 0
  top 30%
  padding 15px
  width 90px
  background-color $secondary
  border-radius 0 15px 15px 0
  &:hover
    color $grey-4
.docs-btn
  .q-btn
    margin 5px

  .btn-fixed-width
    width 70px
</style>
