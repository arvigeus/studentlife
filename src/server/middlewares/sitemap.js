// @flow

import Publication from '../../data/models/Publication';
import formatTime from '../../utils/simpleTimeFormat';

const SitemapEntry = (loc, lastMod, changefreq, priority) =>
  `<url><loc>http://studentlife.bg${loc}</loc>${lastMod ? `<lastmod>${formatTime(lastMod)}</lastmod>` : ''}${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}${priority ? `<priority>${priority}</priority>` : ''}</url>`;

const renderStaticPages = () => [
  '',
  '/publications'
].map(item => SitemapEntry(item)).join('');

const renderPublications = pubs =>
  pubs.map(({ slug, updatedAt }) => SitemapEntry(`/publications/${slug}`, updatedAt)).join('');

export default (req, res, next) => {
  Publication.findAll({
    attributes: ['slug', 'updatedAt'],
    whrere: { published: true }
  }).then((pubs) => {
    res.set('Content-Type', 'application/xml');
    res.status(200).send(`<?xml version="1.0" encoding="utf-8"?><urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${renderStaticPages()}${renderPublications(pubs)}</urlset>`);
  }).catch(next);
};
