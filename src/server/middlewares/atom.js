// @flow

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Publication from '../../data/models/Publication';
import formatTime from '../../utils/simpleTimeFormat';

type AtomEntryType = {
  id: string,
  slug: string,
  title: string,
  excerpt: string,
  tags: Array<string>,
  updatedAt: Date
}

const AtomEntry = ({ id, slug, title, excerpt, tags, updatedAt }: AtomEntryType) =>
  <entry>
    <title>{title}</title>
    <id>{id}</id>
    {tags.map((tag, key) => <category key={key} term={tag} label={tag} />)}
    <link href={`http://studentlife.bg/publications/${slug}`} rel="alternate" />
    <updated>{formatTime(updatedAt)}</updated>
    <content>{excerpt}</content>
  </entry>;

export default (req, res, next) => {
  Publication.findAll({
    attributes: ['id', 'slug', 'title', 'excerpt', 'tags', 'updatedAt'],
    whrere: { published: true }
  }).then((pubs) => {
    let lastUpdated = new Date();
    const entries = pubs.map(({ id, slug, title, excerpt, tags, updatedAt }) => {
      if (updatedAt < lastUpdated) lastUpdated = updatedAt;
      return (
        <AtomEntry
          key={id}
          id={id}
          slug={slug}
          title={title}
          excerpt={excerpt}
          tags={tags}
          updatedAt={updatedAt}
        />
      );
    });
    res.set('Content-Type', 'application/atom+xml');
    res.status(200).send(`<?xml version="1.0" encoding="utf-8"?>${renderToStaticMarkup(
      <feed xmlns="http://www.w3.org/2005/Atom">
        <title>Студентски Живот</title>
        <subtitle>Да надскочим себе си заедно!</subtitle>
        <updated>{formatTime(lastUpdated)}</updated>
        <logo>http://studentlife.bg/logo.svg</logo>
        <icon>http://www.studentlife.bg/favicon.ico</icon>
        <id>http://www.studentlife.bg/</id>
        <rights>Copyright 2005-2016 studentlife.bg</rights>
        <author>
          <name>Nikolay Stoynov</name>
          <uri>
          https://www.linkedin.com/in/nikolai-stoinov-65789b38
          </uri>
          <email>arvigeus@gmail.com</email>
        </author>
        {entries}
      </feed>
    )}`);
  }).catch(next);
};
