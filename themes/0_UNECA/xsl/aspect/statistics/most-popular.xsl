<xsl:stylesheet xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
                xmlns:dri="http://di.tamu.edu/DRI/1.0/"
                xmlns:mets="http://www.loc.gov/METS/"
                xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
                xmlns:xlink="http://www.w3.org/TR/xlink/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:ore="http://www.openarchives.org/ore/terms/"
                xmlns:oreatom="http://www.openarchives.org/ore/atom/"
                xmlns="http://www.w3.org/1999/xhtml"
                xmlns:xalan="http://xml.apache.org/xalan"
                xmlns:encoder="xalan://java.net.URLEncoder"
                xmlns:util="org.dspace.app.xmlui.utils.XSLUtils"
                xmlns:dateUtil="com.atmire.utils.DateUtils"
                exclude-result-prefixes="xalan encoder i18n dri mets dim  xlink xsl">


    <xsl:template match="dri:list[@id='interactive_stats_gear_dropdown']">
        <div class="btn-group pull-right {@id}">
            <xsl:call-template name="renderGearButton"/>
            <ul class="dropdown-menu pull-right" role="menu">
                <xsl:apply-templates/>
                <xsl:for-each
                        select="//dri:field[@id='aspect.statistics.MostPopular.field.nbitems']">
                    <li class="divider"/>
                    <li class="dropdown-header">
                        <i18n:text>xmlui.ArtifactBrowser.ConfigurableBrowse.general.rpp</i18n:text>
                    </li>
                    <xsl:for-each select="dri:option">
                        <li>
                            <a href="#" data-returnvalue="{@returnValue}" data-name="{../@n}" class="rpp">
                                <span>
                                    <xsl:attribute name="class">
                                        <xsl:text>glyphicon glyphicon-ok invisible</xsl:text>
                                    </xsl:attribute>
                                </span>
                                <xsl:value-of select="i18n:translate/i18n:param"/>
                            </a>
                        </li>
                    </xsl:for-each>
                </xsl:for-each>

            </ul>
        </div>

    </xsl:template>

    <xsl:template match="dri:list[@id='interactive_stats_gear_dropdown']/dri:item/dri:xref">
        <li>
            <a href="#" class="{@rend}">
                <span>
                    <xsl:attribute name="class">
                        <xsl:text>glyphicon glyphicon-ok invisible</xsl:text>
                    </xsl:attribute>
                </span>
                <xsl:apply-templates/>
            </a>
        </li>
    </xsl:template>

    <xsl:template match="dri:list[@id='interactive_stats_gear_dropdown']/dri:item[@rend='dropdown-header']">
        <xsl:if test="position() > 1">
            <li class="divider"/>
        </xsl:if>
        <li class="{@rend}">
            <xsl:apply-templates/>
        </li>
    </xsl:template>

    <xsl:template match="dri:table[starts-with(@id, 'aspect.statistics.MostPopular') and '.table.statable' = substring(@id, string-length(@id) - string-length('.table.statable') +1)]">
        <xsl:apply-templates select="dri:head"/>
        <table>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-table table table-hover</xsl:with-param>
            </xsl:call-template>
            <xsl:apply-templates select="dri:row"/>
        </table>
    </xsl:template>
</xsl:stylesheet>