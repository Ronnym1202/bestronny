<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — Ronny Best Mathematics</title>
        <style>
          :root {
            --navy-950: #070f1e;
            --navy-900: #0a1628;
            --navy-800: #0f2040;
            --navy-700: #1a3560;
            --bisque:       #ffe4c4;
            --bisque-light: #fff3e8;
            --bisque-dark:  #e8b87a;
            --bisque-deep:  #c8832a;
            --cream:     #faf7f2;
            --cream-100: #f4efe5;
            --cream-200: #e8dfd0;
            --ink-50:    #5a4e42;
            --ink-30:    #9a8a78;
            --green:     #1e6e36;
            --green-bg:  #e8f5ec;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: var(--cream);
            color: var(--ink-50);
            min-height: 100vh;
          }
          .site-header {
            background: linear-gradient(160deg, var(--navy-950) 0%, var(--navy-800) 55%, var(--navy-700) 100%);
            border-bottom: 3px solid var(--bisque-dark);
            padding: 22px 40px;
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .brand-sigma {
            width: 44px; height: 44px;
            background: var(--bisque-deep);
            color: #fff;
            font-size: 1.4rem;
            font-weight: 900;
            display: flex; align-items: center; justify-content: center;
            border-radius: 8px;
            box-shadow: 0 4px 14px rgba(200,131,42,.35);
            flex-shrink: 0;
          }
          .brand-text {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--bisque-light);
            line-height: 1.2;
          }
          .brand-sub {
            display: block;
            font-size: 0.82em;
            font-weight: 400;
            color: var(--bisque-dark);
          }
          .page-wrap {
            max-width: 1100px;
            margin: 0 auto;
            padding: 36px 24px 60px;
          }
          .intro-card {
            background: #fff;
            border: 1px solid var(--cream-200);
            border-radius: 16px;
            padding: 24px 28px;
            margin-bottom: 24px;
            box-shadow: 0 2px 10px rgba(10,22,40,.08);
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .intro-card h1 {
            font-size: 1.3rem;
            color: var(--navy-800);
            font-weight: 700;
            margin-bottom: 6px;
          }
          .intro-card p {
            font-size: 0.88rem;
            color: var(--ink-30);
            line-height: 1.6;
          }
          .intro-card a { color: var(--bisque-deep); font-weight: 600; text-decoration: none; }
          .intro-badge {
            display: inline-flex;
            align-items: center;
            background: var(--green-bg);
            color: var(--green);
            border: 1px solid rgba(30,110,54,.2);
            border-radius: 50px;
            font-size: 0.78rem;
            font-weight: 700;
            padding: 5px 14px;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .stats-row {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 20px;
          }
          .stat-pill {
            background: #fff;
            border: 1px solid var(--cream-200);
            border-radius: 50px;
            padding: 6px 16px;
            font-size: 0.82rem;
            color: var(--ink-50);
            box-shadow: 0 1px 4px rgba(10,22,40,.06);
          }
          .stat-pill strong { color: var(--bisque-deep); font-weight: 700; }
          .section-label {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--bisque-deep);
            background: rgba(200,131,42,.1);
            border: 1px solid rgba(200,131,42,.2);
            border-radius: 50px;
            padding: 3px 12px;
            display: inline-block;
            margin-bottom: 12px;
          }
          .table-wrap {
            background: #fff;
            border: 1px solid var(--cream-200);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(10,22,40,.08);
            margin-bottom: 32px;
          }
          table { width: 100%; border-collapse: collapse; }
          thead tr {
            background: linear-gradient(90deg, var(--navy-900), var(--navy-700));
          }
          th {
            padding: 13px 18px;
            text-align: left;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--bisque-dark);
          }
          tbody tr { border-bottom: 1px solid var(--cream-200); }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: var(--cream-100); }
          td { padding: 12px 18px; font-size: 0.86rem; vertical-align: middle; }
          td.url-cell a {
            color: var(--navy-700);
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          td.url-cell a:hover { color: var(--bisque-deep); text-decoration: underline; }
          td.date-cell { color: var(--ink-30); white-space: nowrap; font-size: 0.82rem; }
          .pri-badge {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 50px;
          }
          .pri-10 { background: rgba(200,131,42,.15); color: var(--bisque-deep); }
          .pri-hi { background: rgba(10,22,40,.08);   color: var(--navy-700); }
          .pri-md { background: var(--cream-100);     color: var(--ink-50); }
          .pri-lo { background: #fff; color: var(--ink-30); border: 1px solid var(--cream-200); }
          .page-footer {
            text-align: center;
            font-size: 0.78rem;
            color: var(--ink-30);
            padding-top: 12px;
          }
          .page-footer a { color: var(--bisque-deep); text-decoration: none; font-weight: 600; }
          @media (max-width: 600px) {
            .site-header { padding: 16px 18px; }
            .page-wrap { padding: 20px 14px 40px; }
            th, td { padding: 10px 12px; }
          }
        </style>
      </head>
      <body>

        <header class="site-header">
          <div class="brand-sigma">&#x3A3;</div>
          <div class="brand-text">
            Ronny Best
            <span class="brand-sub">Mathematics</span>
          </div>
        </header>

        <div class="page-wrap">

          <div class="intro-card">
            <div>
              <h1>XML Sitemap</h1>
              <p>
                All pages submitted to Google Search Console and Bing Webmaster Tools.<br/>
                Visit <a href="https://bestronny.netlify.app">bestronny.netlify.app</a> to explore the full site.
              </p>
            </div>
            <span class="intro-badge">&#10003; Sitemap Valid</span>
          </div>

          <div class="stats-row">
            <span class="stat-pill">
              <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs indexed
            </span>
            <span class="stat-pill">Last updated <strong>2026-06-15</strong></span>
            <span class="stat-pill">CBC-Aligned &#183; Kenya</span>
          </div>

          <div class="section-label">All Pages</div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Page URL</th>
                  <th>Last Modified</th>
                  <th>Change Freq</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="url-cell">
                      <a href="{sitemap:loc}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="date-cell">
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                    <td class="date-cell">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority = '1.0'">
                          <span class="pri-badge pri-10"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= '0.80'">
                          <span class="pri-badge pri-hi"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority &gt;= '0.60'">
                          <span class="pri-badge pri-md"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="pri-badge pri-lo"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="page-footer">
            &#169; 2026 <a href="https://bestronny.netlify.app">Ronny Best Mathematics</a> &#183;
            Free CBC-aligned mathematics education for every student in Kenya.
          </p>

        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>