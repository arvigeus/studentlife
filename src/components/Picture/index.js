// @flow

type PictureSourceType = {
  srcSet: string,
  media?: string,
  sizes?: string,
  type?: string,
  width: number
}

type PictureType = {
  sources: Array<PictureSourceType>,
  original: string,
  rng: number,
  width: number
}

export { default } from './Picture';
export type {
  PictureSourceType,
  PictureType
};
