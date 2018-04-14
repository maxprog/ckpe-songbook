<template>
  <q-layout view="Lhh lpr lFf">
    <q-layout-header reveal>

      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-btn
          flat
          round
          dense
          v-go-back.single="pageMeta.backRoute"
          class="cordova-only electron-only"
          icon="arrow_back"
          aria-label="Go back"
        />

        <q-toolbar-title>
          <q-icon
            v-show="pageMeta.icon"
            style="font-size: 2rem; margin-right: 5px;"
            :name="pageMeta.icon"
          />
          {{ pageMeta.title }}
        </q-toolbar-title>
        <q-btn flat dense v-if="!$q.platform.within.iframe" class="q-mr-sm" @click="$router.replace('/')" icon="home"/>

        <q-btn
          flat
          round
          dense
          class="within-iframe-hide"
          @click="drawerState = !drawerState"
          icon="menu"
          aria-label="Menu"
        />
      </q-toolbar>

      <showcase-tabs v-if="$q.theme === 'mat'" />
    </q-layout-header>

    <q-layout-footer reveal v-if="$q.theme === 'ios'">
      <showcase-tabs />
    </q-layout-footer>

    <q-layout-drawer v-show="drawerState" v-model="drawerState">
      <q-scroll-area
        style="width: 100%; height: 100%;"
        :class="$q.theme === 'mat' ? 'bg-grey-3' : null"
      >
        <div class="row flex-center bg-white" style="height: 100px">

          <q-icon name="ion-ios-musical-note" color="primary" style="font-size: 54px; "/>
          <div class="caption q-ml-md">
            Śpiewniki Chrześcijańskie
            <br>

          </div>
        </div>
        <q-list no-border>
          <q-item
            @click="drawerState = !drawerState"
            to="/"
            exact
            replace
          >

            <q-item-side icon="home" />
            <q-item-main label="Strona główna" />
          </q-item>
          <q-item-separator />

          <template v-for="category in categories">
            <q-list-header :key="`header-${category.title}`">
              {{ category.title }}
            </q-list-header>
            <q-item
              v-for="feature in category.features"
              :key="feature.hash"
              :to="`/${category.hash}/${feature.hash}`"
              :replace="!category.extract"
            >
              <q-item-side :icon="feature.icon"/>
              <q-item-main :label="feature.title" />
              <q-item-side right v-if="feature.status">
                <q-chip small color="secondary">{{ feature.status }}</q-chip>
              </q-item-side>
            </q-item>
            <q-item-separator :key="`separator-${category.title}`" />
          </template>
          <q-item v-if="!$q.platform.is.ios" @click.native="exitApp()">
            <q-item-side>

              <q-item-tile icon="ion-android-exit"/>
            </q-item-side>
            <q-item-main>

              <q-item-tile label>Zamknij</q-item-tile>

            </q-item-main>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <!--   <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        @leave="resetScroll"
      >
      -->
      <router-view />
    <!--  </transition> -->
    </q-page-container>
  </q-layout>

</template>

<script>
import ShowcaseTabs from 'components/showcase-tabs'
import { mapState } from 'vuex'
import categories from 'assets/categories'

export default {
  components: {
    ShowcaseTabs
  },
  data () {
    return {
      categories

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
  methods: {
    toggleDroverState () {
      this.drawerState = !this.drawerState
    },
    exitApp () {
      // app.exitApp();

      if (navigator && navigator.device) {
        navigator.device.exitApp()
      }
      else
      if (navigator && navigator.app) {
        navigator.app.exitApp()
      }
    },
    toggleFullscreen () {
      this.$q.fullscreen.toggle()
    },
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  }
}
</script>
