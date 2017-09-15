<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
                xmlns:dri="http://di.tamu.edu/DRI/1.0/"
                version="1.0" exclude-result-prefixes="dri xsl">


    <xsl:template match="dri:div[@id='aspect.statistics.StatletTransformer.div.showStats']" />
    <xsl:template match="dri:div[@id='aspect.statistics.StatletTransformer.div.statswrapper']" />


    <xsl:template match="dri:div[@id='aspect.statistics.StatletTransformer.div.showStats']" mode="statistics">
        <div id="aspect_statistics_StatletTransformer_div_showStats" class="ds-static-div">
            <p>
                <xsl:for-each select="dri:p/dri:xref">
                    <xsl:variable name="test">
                        <i18n:text><xsl:value-of select="@target"/></i18n:text>
                    </xsl:variable>
                    <table>
                        <tr>
                            <td>
                                <a class="ds-button-field btn btn-default statistics-button" target="_blank">
                                    <xsl:attribute name="i18n:attr">href</xsl:attribute>
                                    <xsl:attribute name="href"><xsl:value-of select="$test"/></xsl:attribute>
                                    <i18n:text><xsl:value-of select="."/></i18n:text>
                                </a>
                            </td>
                        </tr>
                    </table>
                </xsl:for-each>
            </p>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.statistics.StatletTransformer.div.statswrapper']" mode="statistics">
        <div id="aspect_statistics_StatletTransformer_div_statswrapper" class="ds-static-div clearfix">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

</xsl:stylesheet>
