<?xml version="1.0" encoding="UTF-8"?>

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
    xmlns:confman="org.dspace.core.ConfigurationManager"
	exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc confman">

    <xsl:variable name="thumbnail.maxheight" select="confman:getIntProperty('thumbnail.maxheight', 80)"/>
    <xsl:variable name="thumbnail.maxwidth" select="confman:getIntProperty('thumbnail.maxwidth', 80)"/>

    <xsl:template name="addAtmireMiragePreviewLink">
        <xsl:param name="previewGroupId"/>
        <xsl:param name="previewUrl"/>
        <xsl:if test="$previewGroupId">
            <div class="file-link" style="height: {$thumbnail.maxheight}px;margin-right:0;">
                <xsl:call-template name="renderAtmirePreviewLink">
                    <xsl:with-param name="previewUrl" select="$previewUrl"/>
                </xsl:call-template>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template name="addAtmirePreviewLink">
        <xsl:param name="previewGroupId"/>
        <xsl:param name="previewUrl"/>
        <xsl:if test="$previewGroupId">
            <td>
                <xsl:call-template name="renderAtmirePreviewLink">
                    <xsl:with-param name="previewUrl" select="$previewUrl"/>
                </xsl:call-template>
            </td>
        </xsl:if>
    </xsl:template>

    <xsl:template name="renderAtmirePreviewLink">
        <xsl:param name="previewUrl"/>
        <a>
            <xsl:attribute name="href">
                <xsl:value-of select="$previewUrl"/>
            </xsl:attribute>
            <xsl:variable name="tooltip">
                <xsl:choose>
                    <xsl:when test="starts-with(@MIMETYPE,'image')">
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview-image</i18n:text>
                    </xsl:when>
                    <xsl:when test="starts-with(substring-after(@MIMETYPE,'/'),'pdf')">
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview-scribd</i18n:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview</i18n:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <xsl:attribute name="title">
                <xsl:value-of select="$tooltip"/>
            </xsl:attribute>
            <xsl:attribute name="i18n:attr">title</xsl:attribute>
            <span>
                <xsl:choose>
                    <xsl:when test="starts-with(@MIMETYPE,'image')">
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview-image</i18n:text>
                    </xsl:when>
                    <xsl:when test="starts-with(substring-after(@MIMETYPE,'/'),'pdf')">
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview-scribd</i18n:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <i18n:text>xmlui.dri2xhtml.METS-1.0.item-files-preview</i18n:text>
                    </xsl:otherwise>
                </xsl:choose>
            </span>
        </a>
    </xsl:template>

</xsl:stylesheet>