<template>
  <q-page padding class="card-examples row justify-center items-start">
    <q-card inline class="q-ma-sm">
      <q-card-title>
        Title
      </q-card-title>
      <q-list separator>
        <q-collapsible icon="explore" label="First">
          <div>
            Lorem ipsum dolor sit amet...
          </div>
        </q-collapsible>

        <q-collapsible icon="perm_identity" label="Second">
          <div>
            Lorem ipsum dolor sit amet...
          </div>
        </q-collapsible>

        <q-collapsible icon="shopping_cart" label="Third">
          <div>
            Lorem ipsum dolor sit amet...
          </div>
        </q-collapsible>
      </q-list>
    </q-card>
    <q-card class="bigger q-ma-sm">
      <!--
      <q-card-media>
        <img src="statics/mountains.jpg">
      </q-card-media>-->
      
      <q-card-title class="relative-position">
        <!--<q-btn fab color="primary" icon="place" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />-->

        <div class="ellipsis">Ustawienia</div>

      </q-card-title>
      <q-card-main>
                <q-tabs color="secondary" glossy align="justify">

          <q-tab default name="company" slot="title" icon="people" label="Firma" />
          <q-tab name="person" slot="title" icon="person" label="Autor" />
          <q-tab-pane name="company">
            <q-list>
              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="people" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Company</q-item-tile>
                  <q-item-tile label>JRB System</q-item-tile>

                </q-item-main>
              </q-item>
              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="ion-ios-world-outline" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Webpage</q-item-tile>
                  <q-item-tile label>www.jrbsystem.com</q-item-tile>

                </q-item-main>
              </q-item>
              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="mail" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Email</q-item-tile>
                  <q-item-tile label>info@jrbsystem.com</q-item-tile>

                </q-item-main>
              </q-item>

              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="ion-android-call" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Mobile</q-item-tile>
                  <q-item-tile label>+48 506 402 746</q-item-tile>

                </q-item-main>
              </q-item>
            </q-list>
          </q-tab-pane>
          <q-tab-pane name="person">

            <q-list>

              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="person" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Software Developer</q-item-tile>
                  <q-item-tile label>Emanuel Trzcionkowski</q-item-tile>

                </q-item-main>
              </q-item>
              <q-item>
                <q-item-side>
                  <q-item-tile color="primary" icon="person" />
                </q-item-side>
                <q-item-main>
                  <q-item-tile sublabel>Software Developer</q-item-tile>
                  <q-item-tile label>Greg (Grzegorz) Kroczek</q-item-tile>
                </q-item-main>
              </q-item>

            </q-list>
          </q-tab-pane>

        </q-tabs>

      </q-card-main>
      <q-card-separator />
      <q-card-actions align="center">
        <p class="text-faded text-center">Copyright by JRB System</p>

      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      stars: 3,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="stylus">
.card-examples
  .q-card
    width 300px
  .bigger
    width 450px
    max-width 90vw
  @media (max-width $breakpoint-xs-max)
    .q-card
      width 100%
</style>
