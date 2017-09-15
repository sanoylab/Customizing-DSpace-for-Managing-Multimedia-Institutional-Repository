<?xml version="1.0" encoding="UTF-8"?>
<!--

    The contents of this file are subject to the license and copyright
    detailed in the LICENSE and NOTICE files at the root of the source
    tree and available online at

    http://www.dspace.org/license/

-->

<!--
    Author: Art Lowel (art at atmire dot com)

    The purpose of this file is to transform the DRI for some parts of
    DSpace into a format more suited for the theme xsls. This way the
    theme xsl files can stay cleaner, without having to change Java
    code and interfere with other themes

    e.g. this file can be used to add a class to a form field, without
    having to duplicate the entire form field template in the theme xsl
    Simply add it here to the rend attribute and let the default form
    field template handle the rest.
-->

<xsl:stylesheet
        xmlns="http://di.tamu.edu/DRI/1.0/"
        xmlns:dri="http://di.tamu.edu/DRI/1.0/"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
        xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
        exclude-result-prefixes="xsl dri i18n">

    <xsl:output indent="yes"/>

 <!--   <xsl:template match="dri:options/dri:list/dri:head">
        <head>
            <xsl:call-template name="copy-attributes"/>
            <xsl:attribute name="rend">
                <xsl:value-of select="@rend"/>
                <xsl:text> h6</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </head>
    </xsl:template>

    <xsl:template match="dri:options/dri:list/dri:list/dri:head">
        <head>
            <xsl:call-template name="copy-attributes"/>
            <xsl:attribute name="rend">
                <xsl:value-of select="@rend"/>
                <xsl:text> h5</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </head>
    </xsl:template>-->

    <xsl:template match="dri:options">
        <xsl:if test="string-length(/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='request' and @qualifier='URI']/text()) != 0">
        <options>
            <xsl:call-template name="copy-attributes"/>
            <xsl:apply-templates/>
            <xsl:if test="count(/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='feed']) != 0">
                <list n="feed">
                    <head>
                        <i18n:text>xmlui.feed.header</i18n:text>
                    </head>
                    <xsl:for-each select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='feed']">
                        <item>
                            <xref>
                                <xsl:attribute name="target">
                                    <xsl:value-of select="."/>
                                </xsl:attribute>
                                <xsl:choose>
                                    <xsl:when test="contains(., 'rss_1.0')">
                                        <xsl:text>RSS 1.0</xsl:text>
                                    </xsl:when>
                                    <xsl:when test="contains(., 'rss_2.0')">
                                        <xsl:text>RSS 2.0</xsl:text>
                                    </xsl:when>
                                    <xsl:when test="contains(., 'atom_1.0')">
                                        <xsl:text>Atom</xsl:text>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="@qualifier"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xref>
                        </item>
                    </xsl:for-each>
                </list>
            </xsl:if>
        </options>
        </xsl:if>
    </xsl:template>


</xsl:stylesheet>
