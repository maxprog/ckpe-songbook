export default [
  {
    title: 'Śpiewniki',
    icon: 'ion-ios-musical-note',
    hash: 'songbooks',

    features: [
      {
        title: 'Śpiewnik CKPE',
        icon: 'ion-music-note',
        parent_hash: 'songbooks',
        hash: 'ckpe',
        songbook: 'ckpe',
        iframeTabs: true,
        tabs: [
          {
            title: 'Śpiewnik CKPE',
            label: 'Lista pieśni',
            icon: 'list',
            hash: 'table-features'
          },
          {
            title: 'Śpiewnik CKPE',
            label: 'Numery pieśni',
            icon: 'ion-grid',
            hash: 'btn'
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
        title: 'Ustawienia',
        icon: 'ion-wrench',
        hash: 'settings'

      },
      {
        title: 'O Aplikacji',
        icon: 'contacts',
        hash: 'about'

      }
    ]
  }

]
