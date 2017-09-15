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

    <xsl:template match="dri:cell[@id='aspect.statistics.StatletProvider.cell.spacer']">
        <td>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:text>&#160;</xsl:text>
        </td>
    </xsl:template>

    <xsl:template match="dri:div[starts-with(@id, 'aspect.statistics.StatletProvider.div.graph')]" priority="3">
        <xsl:apply-templates select="dri:head"/>
        <div>
            <xsl:for-each select="dri:list[@id='aspect.statistics.StatletProvider.list.divattrs']/dri:item">
                <xsl:variable name="attrname"><xsl:value-of select="@n"/></xsl:variable>
                <xsl:attribute name="{$attrname}"><xsl:value-of select="@rend"/></xsl:attribute>
            </xsl:for-each>
            <xsl:call-template name="standardAttributes"/>
            <img>
                <xsl:attribute name="src">
                    <xsl:value-of select="dri:p/dri:figure/@source"/>-img<xsl:value-of select="dri:p/dri:figure/@target"/>
                </xsl:attribute>
                <xsl:attribute name="usemap">
                    <xsl:text>#</xsl:text>
                    <xsl:value-of select="dri:p/map/@id"/>
                </xsl:attribute>
            </img>
            <xsl:copy-of select="dri:p/map"/>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.statistics.StatletProvider.div.tablewrapper']" priority="3">
        <div>
            <xsl:for-each select="dri:list[@id='aspect.statistics.StatletProvider.list.divattrs']/dri:item">
                <xsl:variable name="attrname">
                    <xsl:value-of select="@n"/>
                </xsl:variable>
                <xsl:attribute name="{$attrname}">
                    <xsl:value-of select="@rend"/>
                </xsl:attribute>
            </xsl:for-each>
            <xsl:call-template name="standardAttributes"/>
            <xsl:apply-templates select="dri:table"/>
        </div>

    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.statistics.StatletProvider.div.listingswrapper']" priority="3">
        <div>
            <xsl:for-each select="dri:list[@id='aspect.statistics.StatletProvider.list.divattrs']/dri:item">
                <xsl:variable name="attrname">
                    <xsl:value-of select="@n"/>
                </xsl:variable>
                <xsl:attribute name="{$attrname}">
                    <xsl:value-of select="@rend"/>
                </xsl:attribute>
            </xsl:for-each>
            <xsl:call-template name="standardAttributes"/>
            <xsl:apply-templates select="dri:table"/>
        </div>

    </xsl:template>


    <xsl:template match="dri:div[@id='aspect.statistics.StatletProvider.div.statscontent']//dri:head">
        <h4 class="atmire-cua-statlet-head">
            <xsl:apply-templates/>
        </h4>
    </xsl:template>


</xsl:stylesheet>
