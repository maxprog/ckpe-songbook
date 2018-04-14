import categories from 'assets/categories'

const routes = []

function lazyLoad (path, meta) {
  return {
    path,
    meta,
    component: () => import('pages/showcase/' + path.replace(/ckpe/gi,'table'))
  }
}

const showcase = {
  path: '/',
  component: () => import('layouts/default'),
  children: [
    {
      path: '',
      meta: {
        title: 'Spiewniki',
        hash: '/',
        icon: 'layers',
        backRoute: '/'
      },
      component: () => import('pages/index')
    }
  ]
}

categories.forEach(category => {
  if (category.extract) {
    return
  }
  category.features.forEach(feature => {

    let path = category.hash + '/' + feature.hash;

    if (!feature.tabs) {
      showcase.children.push(lazyLoad(path, feature))
      return
    }

    feature.tabs.forEach(tab => {
      let subpath = path + '/' + tab.hash
      showcase.children.push(lazyLoad(subpath, {
        title: tab.title,
        hash: '/' + path,
        iframeTabs: feature.iframeTabs,
        icon: feature.icon,
        tabs: feature.tabs,
        songbook: feature.songbook
      }))
    })

    routes.push({
      path: '/' + path,
      redirect: '/' + path + '/' + feature.tabs[0].hash
    })
  })
})

routes.push(showcase)

routes.push({ path: '*', component: () => import('pages/error404.vue') })


export default routes
