<?xml version="1.0" encoding="UTF-8"?>
<!--

    The contents of this file are subject to the license and copyright
    detailed in the LICENSE and NOTICE files at the root of the source
    tree and available online at

    http://www.dspace.org/license/

-->

<!--
    TODO: Describe this XSL file
    Author: Alexey Maslov

-->

<xsl:stylesheet xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
                xmlns:dri="http://di.tamu.edu/DRI/1.0/"
                xmlns:mets="http://www.loc.gov/METS/"
                xmlns:xlink="http://www.w3.org/TR/xlink/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:mods="http://www.loc.gov/mods/v3"
                xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:exslt="http://exslt.org/common"
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:confman="org.dspace.core.ConfigurationManager"
                exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc">

    <xsl:variable name="feednumber" select="confman:getIntProperty('multimedia.rss.feed.number', 5)"/>

    <xsl:template match="dri:div[@rend='multimedia-content']">
        <div class="multimedia-content">
            <xsl:variable name="externalMetadataURL">
                <xsl:text>cocoon:/</xsl:text>
                <xsl:value-of select="concat('/multimedia/html/',@id)"/>
            </xsl:variable>

            <xsl:variable name="multimedia" select="document($externalMetadataURL)"/>

            <xsl:choose>
                <xsl:when test="contains($multimedia,'rss')">
                    <xsl:for-each select="exslt:node-set($multimedia)/rss/channel/item">
                        <xsl:if test="position() &lt; $feednumber">
                            <ul class="rss-item">
                                <li class="rss-title">
                                    <xsl:value-of select="title"/>
                                </li>
                                <li class="rss-description">
                                    <!--<xsl:choose>-->
                                    <!--<xsl:when test="string-length(description)>100">-->
                                    <!--<xsl:value-of select="substring(description,0,100)"/>-->
                                    <!--<xsl:text>...</xsl:text>-->
                                    <!--</xsl:when>-->
                                    <!--<xsl:otherwise>-->
                                    <!--<xsl:value-of select="description"/>-->
                                    <!--</xsl:otherwise>-->
                                    <!--</xsl:choose>-->
                                    <xsl:value-of select="description" disable-output-escaping="yes"/>
                                </li>
                                <li class="rss-read-more">
                                    <a>
                                        <xsl:attribute name="href">
                                            <xsl:value-of select="link"/>
                                        </xsl:attribute>
                                        <xsl:text>Read more</xsl:text>
                                    </a>
                                </li>
                            </ul>
                        </xsl:if>
                    </xsl:for-each>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:copy-of select="$multimedia"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>

</xsl:stylesheet>