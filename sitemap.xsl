<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:output method="html" indent="yes"/>

<xsl:template match="/">

<html>
<head>
    <title>Ronny Best Mathematics Sitemap</title>

    <style>
        body{
            font-family: Arial, sans-serif;
            background:#f4f4f4;
            padding:30px;
            color:#222;
        }

        h1{
            color:#0b57d0;
        }

        table{
            width:100%;
            border-collapse:collapse;
            background:white;
            box-shadow:0 2px 10px rgba(0,0,0,0.1);
        }

        th, td{
            padding:12px;
            border:1px solid #ddd;
            text-align:left;
        }

        th{
            background:#0b57d0;
            color:white;
        }

        tr:nth-child(even){
            background:#f9f9f9;
        }

        a{
            color:#0b57d0;
            text-decoration:none;
        }

        a:hover{
            text-decoration:underline;
        }
    </style>
</head>

<body>

<h1>Ronny Best Mathematics Sitemap</h1>

<p>
This sitemap contains all important pages submitted to search engines.
</p>

<table>
    <tr>
        <th>URL</th>
        <th>Last Modified</th>
        <th>Priority</th>
    </tr>

    <xsl:for-each select="sitemap:urlset/sitemap:url">

    <tr>
        <td>
            <a href="{sitemap:loc}">
                <xsl:value-of select="sitemap:loc"/>
            </a>
        </td>

        <td>
            <xsl:value-of select="sitemap:lastmod"/>
        </td>

        <td>
            <xsl:value-of select="sitemap:priority"/>
        </td>
    </tr>

    </xsl:for-each>

</table>

</body>
</html>

</xsl:template>

</xsl:stylesheet>