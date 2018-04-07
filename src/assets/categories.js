export default [
  {
    title: 'Śpiewniki',
    icon: 'ion-ios-musical-note',
    hash: 'songbooks',

    features: [
      {
        title: 'Śpiewnik Pielgrzyma',
        icon: 'ion-music-note',
        parent_hash: 'songbooks',
        hash: 'pielgrzym',
        songbook: 'pielgrzym',
        iframeTabs: true,
        tabs: [
          {
            title: 'Śpiewnik Pielgrzyma',
            label: 'Numery pieśni',
            icon: 'ion-grid',
            hash: 'btn'
          },
          {
            title: 'Śpiewnik Pielgrzyma',
            label: 'Lista pieśni',
            icon: 'list',
            hash: 'table-features'
          }
        ]
      },
      {
        title: 'Wędrowiec',
        icon: 'ion-music-note',
        parent_hash: 'songbooks',
        hash: 'wedrowiec',
        songbook: 'wedrowiec',
        iframeTabs: true,
        tabs: [
          {
            title: 'Wędrowiec',
            label: 'Numery pieśni',
            icon: 'ion-grid',
            hash: 'btn'
          },
          {
            title: 'Wędrowiec',
            label: 'Lista pieśni',
            icon: 'list',
            hash: 'table-features'
          }
        ]
      }

    ]
  },

  {
    title: 'Aplikacja',
    icon: 'devices',
    hash: 'application',
    parent_hash: 'songbooks',

    features: [

      {
        title: 'O Aplikacji',
        icon: 'contacts',
        hash: 'about'

      }
    ]
  }

]
