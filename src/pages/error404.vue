<template>
  <div class="fixed-center text-center">
    <p
      icon="settings"
    />
    <p class="text-faded">Nie znaleziono strony...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Wróć do strony głównej</q-btn>
  </div>
</template>
