/**
 * シンプルなsitemap.xmlとrobots.txt生成スクリプト
 * 単一ページサイト向け
 */
const fs = require('fs');
const path = require('path');

// 設定 - サイトのURLを実際のものに変更してください
const SITE_URL = 'https://Yun-zhe-Zheng.github.io';
const DIST_DIR = path.resolve(__dirname, '../dist');
const LAST_MOD = new Date().toISOString().split('T')[0]; // YYYY-MM-DD形式

// 出力ディレクトリが存在するか確認
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
  console.log(`Created dist directory: ${DIST_DIR}`);
}

// 1. sitemap.xmlの生成
function generateSitemap() {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`Generated sitemap.xml at: ${sitemapPath}`);
}

// 2. robots.txtの生成
function generateRobots() {
  const robotsContent = `User-agent: *
Allow: /

# サイトマップの場所
Sitemap: ${SITE_URL}/sitemap.xml`;

  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`Generated robots.txt at: ${robotsPath}`);
}

// スクリプト実行
generateSitemap();
generateRobots();

console.log('✅ SEOファイルの生成が完了しました');
