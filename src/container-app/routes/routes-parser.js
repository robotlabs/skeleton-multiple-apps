export const routesLoad = async () => {
  return new Promise((resolve, reject) => {
    fetchData()
      .then((r) => {
        resolve(r)
      })
  })
}
const fetchData = async () => {
  const res = await window.fetch('./apps-map.json')
  const json = await res.json()
  return routesParser(json)
}
const routesParser = (experiencesMap) => {
  experiencesMap.sort(compare)
  return experiencesMap
}

function compare (a, b) {
  if (a.day > b.day) return 1
  if (b.day > a.day) return -1
  return 0
}
