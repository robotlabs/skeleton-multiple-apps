import { onLoaderSoundCompleted, onLoaderAllSoundsCompleted } from './../../signals/shared-signals'
export const pixiPreload = (loader, manifest, progress, isAnimation = false) => {
  return new Promise((resolve) => {
    const path = manifest.base + '/'
    loader.resources = {}
    for (let i = 0; i < manifest.spritesheets.length; i++) {
      var assetsToLoadObj = manifest.spritesheets[i]
      for (let i = 0; i < assetsToLoadObj.nrFiles; i++) {
        loader.add(assetsToLoadObj.name + '-' + i, path + assetsToLoadObj.name + '/' + assetsToLoadObj.name + '-' + i + '.json')
      }
    }
    const pngList = manifest.pngs
    for (let i = 0; i < pngList.length; i++) {
      const png = pngList[i]
      loader.add(png.name, path + png.name)
    }
    loader.onProgress.add((e) => {
      progress(e)
    })
    /*
    //USE for DEBUG
    loader.onProgress.add((pr) => {
      console.log('on progress add ', pr)
    }) // called once per loaded/errored file
    loader.onError.add((err) => {
      console.log('on error add', err)
    }) // called once per errored file
    loader.onLoad.add((r) => {
      console.log('whatever add', r)
    }) // called once per loaded file
    */
    loader.load()

    loader.onComplete.add((r) => {
      if (isAnimation) {
        // createAnimations(manifest)
      }
      resolve()
    })
  })
}

export const loadPrecacheImgs = (manifest, progress) => {
  let iterLoaded = 0
  return new Promise((resolve) => {
    const preloadManifestPromises = []
    manifest.forEach((d, i) => {
      const imgPromise = preloadImg(d)
        .then((d) => {
          iterLoaded++
          const perc = (iterLoaded) / manifest.length
          progress(perc * 100)
        })
      preloadManifestPromises.push(imgPromise)
    })
    Promise.all(preloadManifestPromises)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

export async function preloadVideo (path) {
  return new Promise((resolve) => {
    window.fetch(path).then(resolve)
  })
}

export async function preloadSounds (getPartialSoundProgress) {
  return new Promise((resolve) => {
    const onSoundLoadedAdd = onLoaderSoundCompleted.add((e) => {
      const perc = e.totSoundsLoaded / (e.totSounds - 1)
      getPartialSoundProgress(perc * 100)
    })
    const onAllSoundLoadedAdd = onLoaderAllSoundsCompleted.add(() => {
      onSoundLoadedAdd.detach()
      onAllSoundLoadedAdd.detach()
      resolve()
    })
  })
}

const preloadImg = (path) => {
  return new Promise((resolve) => {
    const image = new window.Image()
    image.onload = resolve
    image.onerror = resolve
    image.src = path
  })
}
