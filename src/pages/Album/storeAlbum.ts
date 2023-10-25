

import { AlbumListType, Item } from '@/utility/api/albums_list_type'
import { create } from 'zustand'

const defailtData: Item = {
  artists: [{
    external_urls: { spotify: '' },
    href: '',
    id: '',
    name: '',
    type: '',
    uri: ''
  }],
  available_markets: [''],
  disc_number: 0,
  duration_ms: 0,
  explicit: false,
  external_urls: { spotify: '' },
  href: '',
  id: '',
  is_local: false,
  name: '',
  preview_url: '',
  track_number: 0,
  type: '',
  uri: ''
}

type TrackStore = Store<Item> & {
  toggle: boolean,
  setToggle: (e: boolean) => void
}

export const useTrackStore = create<TrackStore>((set) => ({
  data: defailtData,
  toggle: false,
  setToggle: (toggle) => set(() => ({ toggle })),
  set: (data) => set(() => ({ data, toggle: true })),
  reset: () => set(() => ({ data: defailtData, toggle: false })),
}))


export const useAlbumStore = create<Store<AlbumListType | undefined>>((set) => ({
  data: undefined,
  set: (data) => set(() => ({ data })),
  reset: () => set(() => ({ data: undefined })),
}))
