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
                                                                                              <!--the substring stuff just means 'ends-with', but that function doesn't exist in XSLT 1-->
    <xsl:template match="dri:div[starts-with(@id, 'aspect.statistics.MostPopular') and '.div.warning' = substring(@id, string-length(@id) - string-length('.div.warning') +1)]/dri:p">
        <p>
            <xsl:call-template name="copy-attributes"/>
            <xsl:attribute name="rend">
                <xsl:value-of select="@rend"/>
                <xsl:text> alert alert-warning hidden</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="dri:div[starts-with(@id, 'aspect.statistics.MostPopular') and '.div.error' = substring(@id, string-length(@id) - string-length('.div.error') +1)]/dri:p">
        <p>
            <xsl:call-template name="copy-attributes"/>
            <xsl:attribute name="rend">
                <xsl:value-of select="@rend"/>
                <xsl:text> alert alert-danger</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </p>
    </xsl:template>

    <xsl:template match="dri:p[starts-with(@id, 'aspect.statistics.MostPopular') and '.p.controls' = substring(@id, string-length(@id) - string-length('.p.controls') +1)]">
        <div>
            <xsl:call-template name="copy-attributes"/>
            <xsl:attribute name="rend">
                <xsl:value-of select="@rend"/>
                <!--<xsl:text> row hidden-xs</xsl:text>-->
                <xsl:text> row invisible-xs</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="dri:p[starts-with(@id, 'aspect.statistics.MostPopular') and '.p.controls' = substring(@id, string-length(@id) - string-length('.p.controls') +1)]/dri:field[not(@type='hidden')]">
        <xsl:variable name="nbcols">
            <xsl:choose>
                <xsl:when test="//dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.solutionfilter' = substring(@id, string-length(@id) - string-length('.field.solutionfilter') +1)]">
                    <xsl:text>2</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>3</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div rend="col-xs-6 col-sm-{$nbcols}">
            <field>
                <xsl:call-template name="copy-attributes"/>
                <xsl:apply-templates/>
            </field>
        </div>
    </xsl:template>

    <xsl:template match="dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.timeFilter' = substring(@id, string-length(@id) - string-length('.field.timeFilter') +1)]">
        <xsl:variable name="nbcols">
            <xsl:choose>
                <xsl:when test="//dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.newCountryCode' = substring(@id, string-length(@id) - string-length('.field.newCountryCode') +1)] or //dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.geo' = substring(@id, string-length(@id) - string-length('.field.geo') +1)]">
                    <xsl:text>6</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>12</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="nbcolssm">
            <xsl:choose>
                <xsl:when test="//dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.solutionfilter' = substring(@id, string-length(@id) - string-length('.field.solutionfilter') +1)]">
                    <xsl:text>2</xsl:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>3</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>

        <div rend="col-xs-{$nbcols} col-sm-{$nbcolssm}">
            <field>
                <xsl:call-template name="copy-attributes"/>
                <xsl:apply-templates/>
            </field>
        </div>
    </xsl:template>


    <xsl:template match="dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.geo' = substring(@id, string-length(@id) - string-length('.field.geo') +1)]">
        <div rend="col-xs-6 col-sm-3">
            <field>
                <xsl:call-template name="copy-attributes"/>
                <xsl:apply-templates/>
            </field>
        </div>
    </xsl:template>

    <xsl:template match="dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.nbitems' = substring(@id, string-length(@id) - string-length('.field.nbitems') +1)]">
        <xsl:choose>
            <xsl:when test="//dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.solutionfilter' = substring(@id, string-length(@id) - string-length('.field.solutionfilter') +1)]">
                <field type="hidden" id="aspect.statistics.MostPopular*.field.nbitems" n="nbitems"><value type="raw">50</value></field>
            </xsl:when>
            <xsl:otherwise>
                <div rend="col-xs-6 col-sm-2 nbitems">
                    <field>
                        <xsl:call-template name="copy-attributes"/>
                        <xsl:apply-templates/>
                    </field>
                </div>
            </xsl:otherwise>
        </xsl:choose>


    </xsl:template>

    <xsl:template match="dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.solutionfilter' = substring(@id, string-length(@id) - string-length('.field.solutionfilter') +1)]">
        <div rend="col-xs-6 col-sm-4">
            <field>
                <xsl:call-template name="copy-attributes"/>
                <xsl:apply-templates/>
            </field>
        </div>
    </xsl:template>

    <xsl:template match="dri:field[starts-with(@id, 'aspect.statistics.MostPopular') and '.field.collection' = substring(@id, string-length(@id) - string-length('.field.collection') +1)]">
        <xsl:variable name="nbcols">
            <xsl:choose>
                <xsl:when test="count(//dri:p[starts-with(@id, 'aspect.statistics.MostPopular') and '.p.controls' = substring(@id, string-length(@id) - string-length('.p.controls') +1)]/dri:field[not(@type='hidden')])>3">
                    <xsl:choose>
                        <xsl:when test="count(//dri:p[starts-with(@id, 'aspect.statistics.MostPopular') and '.p.controls' = substring(@id, string-length(@id) - string-length('.p.controls') +1)]/dri:field[not(@type='hidden')])>4">
                            <xsl:text>3</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>4</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>7</xsl:text>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <xsl:if test="not(@rend='hidden')">
            <div rend="col-xs-6 col-sm-{$nbcols}">
                <field>
                    <xsl:call-template name="copy-attributes"/>
                    <xsl:apply-templates/>
                </field>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="dri:div[starts-with(@id, 'aspect.statistics.MostPopular') and '.div.geo-stats' = substring(@id, string-length(@id) - string-length('.div.geo-stats') +1)]">
        <xsl:variable name="show_header"
                      select="//dri:div[starts-with(@id, 'aspect.statistics.MostPopular') and '.div.tableContainer' = substring(@id, string-length(@id) - string-length('.div.tableContainer') +1)]//dri:cell[contains(@rend, 'sortable') or contains(@rend, 'additional-header')]"/>
        <xsl:variable name="sortable_header"
                      select="//dri:div[starts-with(@id, 'aspect.statistics.MostPopular') and '.div.tableContainer' = substring(@id, string-length(@id) - string-length('.div.tableContainer') +1)]//dri:cell[contains(@rend, 'sortable')]"/>
        <div rend="row">
            <div rend="col-xs-10 col-sm-12 contain-head">
                <div>
                    <xsl:apply-templates select="dri:head"/>
                    <xsl:text>&#160;</xsl:text>
                </div>
            </div>
            <div rend="col-xs-2 visible-xs">
                <list id="interactive_stats_gear_dropdown">
                    <item rend="dropdown-header">
                        <xsl:text>Show:</xsl:text>
                        <!-- TODO i18n -->
                    </item>
                    <xsl:for-each select="$show_header">
                        <item>
                            <xref rend="show_column {@rend}" target="#">
                                <xsl:apply-templates/>
                            </xref>
                        </item>
                    </xsl:for-each>
                    <item rend="dropdown-header">
                        <xsl:text>Sort by:</xsl:text>
                        <!-- TODO i18n -->
                    </item>
                    <xsl:for-each select="$sortable_header">
                        <item>
                            <xref rend="sort_by_column {@rend}" target="#">
                                <xsl:apply-templates/>
                            </xref>
                        </item>
                    </xsl:for-each>
                </list>
            </div>
        </div>

        <div>
            <xsl:call-template name="copy-attributes"/>
            <xsl:apply-templates select="*[not(self::dri:head)]"/>
        </div>
    </xsl:template>

    <!--<xsl:template match="dri:metadata[@element='stylesheet'][contains(text(), 'statistics-style.css')]"/>-->

</xsl:stylesheet>
