export const checkIfIdMatchesClipIdOrEpisodeIdOrAddByUrl = (
  id?: string,
  clipId?: string,
  episodeId?: string,
  addByRSSPodcastFeedUrl?: string
) => {
  let matches = false

  if (addByRSSPodcastFeedUrl) {
    matches = addByRSSPodcastFeedUrl === id
  } else if (clipId) {
    matches = clipId === id
  } else if (episodeId) {
    matches = episodeId === id
  }

  return matches
}

export const convertBytesToHumanReadableString = (bytes: number) => {
  const thresh = 1000
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

export const encodeSpacesInString = (str: string) => {
  return str.replace(/ /g, '%20')
}

export const numberWithCommas = (x?: number) => {
  if (!x || x === 0) return x
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const overrideImageUrlWithChapterImageUrl = (nowPlayingItem: any, currentChapter: any) => {
  let imageUrl = nowPlayingItem ? nowPlayingItem.podcastImageUrl : ''
  if (nowPlayingItem && !nowPlayingItem.clipId && currentChapter && currentChapter.imageUrl) {
    imageUrl = currentChapter.imageUrl
  }
  return imageUrl
}

export const parseCommaDelimitedNamesAndURLsString = (str: string) => {
  if (!str) return []

  const arr = str.split(',')  
  const persons = arr.map((str: string) => {
    let name = ''
    let url = ''
    if (str.indexOf('<') && str.indexOf('>') > str.indexOf('<')) {
      name = str.substring(0, str.indexOf('<'))
      url = str.substring(str.indexOf('<') + 1, str.indexOf('>'))
    } else {
      name = str
    }

    return { name, url }
  })

  return persons
}

export const removeArticles = (str: string) => {
  const words = str.split(' ')
  if (words.length <= 1) return str
  if (words[0] === 'a' || words[0] === 'the' || words[0] === 'an') {
    return words.splice(1).join(' ')
  }
  return str
}
