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
                xmlns="http://www.w3.org/1999/xhtml"
                exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc">

    <xsl:import href="../../0_UNECA/xsl/theme.xsl"/>
    <xsl:output indent="yes"/>

<!--    <xsl:template name="searchbar-input-class">
        <xsl:text>input-lg</xsl:text>
    </xsl:template>
    <xsl:template name="searchbar-btn-group-class">
        <xsl:text>btn-group-lg</xsl:text>
    </xsl:template>-->

    <xsl:template name="searchbar-left-cols">
        <xsl:text>col-xs-10 col-sm-8</xsl:text>
    </xsl:template>
    <xsl:template name="searchbar-right-cols">
        <xsl:text>col-xs-2 col-sm-4</xsl:text>
    </xsl:template>

    <xsl:template name="searchbar-right-content">
        <img src="{$context-path}/static/images/i/governance_0.jpg"></img>
    </xsl:template>

</xsl:stylesheet>
