import axios from "axios"
import { axiosClient, catchHelper } from "@/utility/axios";
import { PlylistByCategoryType } from "./playlist_by_categry_type";
import { AlbumRecomendType } from "./albums_recomend_type";
import { AlbumListType } from "./albums_list_type";
import { ArtistType } from "./artist_type";
import { TrackListByIdType } from "./track_list";

interface GetAuthTokenReturn {
  "access_token": string,
  "token_type": string,
  "expires_in": number
}

export const getAuthToken = (): Promise<GetAuthTokenReturn> => {
  return new Promise((resolve, reject) => {
    axios.post(import.meta.env.VITE_APP_AUTH_URL, {
      grant_type: 'client_credentials'
    }, {
      auth: {
        username: import.meta.env.VITE_APP_CLIENT_ID,
        password: import.meta.env.VITE_APP_CLIENT_SECRET
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

    }).then(response => {
      resolve(response.data);
    }).catch(error => {
      catchHelper(reject, error)
    })
  })
}

export type GetPlaylistByCategoryProps = {
  category_id: string
}

export const getPlaylistByCategory = ({ category_id }: GetPlaylistByCategoryProps): Promise<PlylistByCategoryType> => {
  return new Promise((resolve, reject) => {
    axiosClient.get(`browse/categories/${category_id}/playlists`).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log(error)
      catchHelper(reject, error)
    })
  })
}

export const getAlbumRecomend = (): Promise<AlbumRecomendType> => {
  return new Promise((resolve, reject) => {
    axiosClient.get(`recommendations?seed_artists=6UgERnTHmjk3qXM9x5vzyO&market=ID`).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log(error)
      catchHelper(reject, error)
    })
  })
}

export const getAlbumsById = (id: string): Promise<AlbumListType> => {
  return new Promise((resolve, reject) => {
    axiosClient.get(`albums/${id}`).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log(error)
      catchHelper(reject, error)
    })
  })
}

export const getArtistById = (id: string): Promise<ArtistType> => {
  return new Promise((resolve, reject) => {
    axiosClient.get(`artists/${id}`).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log(error)
      catchHelper(reject, error)
    })
  })
}

export const getTrackById = (id: string): Promise<TrackListByIdType> => {
  return new Promise((resolve, reject) => {
    axiosClient.get(`tracks/${id}`).then(response => {
      resolve(response.data);
    }).catch(error => {
      console.log(error)
      catchHelper(reject, error)
    })
  })
}



