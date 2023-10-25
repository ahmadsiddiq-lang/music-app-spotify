export interface AlbumListType {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ID {
  The2Ooa3TrmlskyBftzenv6XQ = "2Ooa3TrmlskyBftzenv6xQ",
  The3O2NrR3AVXAJQfMZA9Imzb = "3O2nrR3AvXAJQfMZA9Imzb",
}

export enum Name {
  Ichamalia = "Ichamalia",
  PayungTeduh = "Payung Teduh",
}

export enum Type {
  Artist = "artist",
}

export enum URI {
  SpotifyArtist2Ooa3TrmlskyBftzenv6XQ = "spotify:artist:2Ooa3TrmlskyBftzenv6xQ",
  SpotifyArtist3O2NrR3AVXAJQfMZA9Imzb = "spotify:artist:3O2nrR3AvXAJQfMZA9Imzb",
}

export interface Copyright {
  text: Name;
  type: string;
}

export interface ExternalIDS {
  upc: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
