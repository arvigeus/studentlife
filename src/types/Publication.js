import type { PictureType } from './Picture';
import type { UserShortType } from './User';

export type PublicationType = {
  id: string,
  slug: string,
  title: string,
  picture: PictureType,
  content: string,
  tags: Array<string>,
  published: bool,
  restricted: bool,
  commentsEnabled: bool,
  createdAt: DateTime,
  createdBy: UserShortType,
  updatedAt: DateTime,
  updatedBy: UserShortType
};

export type PublicationExcerptType = {
  slug: string,
  title: string,
  picture: PictureType,
  excerpt: string,
  tags: Array<string>,
  published: bool,
  createdAt: DateTime,
  createdBy: UserShortType
};

export type PublicationListItemType = {
  slug: string,
  title: string
};
