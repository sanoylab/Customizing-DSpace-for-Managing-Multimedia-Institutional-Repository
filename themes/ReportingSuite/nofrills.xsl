<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
    xmlns:dri="http://di.tamu.edu/DRI/1.0/"
    xmlns:mets="http://www.loc.gov/METS/"
    xmlns:xlink="http://www.w3.org/TR/xlink/"
    version="1.0" exclude-result-prefixes="i18n dri mets xlink xsl">
    <xsl:import href="../dri2xhtml.xsl"/>
    <xsl:import href="../ReportingSuite/statistics.xsl"/>
    <xsl:import href="../Atmire-add-ons/Atmire-add-ons.xsl"/>

    <xsl:output indent="yes"/>

    <xsl:template match="dri:document">
        <html>
            <!--<head>-->
                <!--<xsl:call-template name="buildHead"/>-->
            <!--</head>-->
            <body>
                <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>

    <xsl:template name="buildHead">
        <xsl:for-each select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='functjavascript']">
            <script type="text/javascript">
                <xsl:variable name="url">
                    <xsl:choose>
                        <xsl:when test="@absolutePath='true'">
                            <xsl:value-of select="."/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                            <xsl:text>/aspects/</xsl:text>
                            <xsl:value-of select="."/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <xsl:attribute name="src">
                    <xsl:value-of select="utils:collapseUrl($url)" xmlns:utils="org.dspace.app.xmlui.utils.XSLUtils"/>
                </xsl:attribute>
                &#160;
            </script>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="dri:table">
        <xsl:apply-templates select="dri:head"/>
        <table>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-table</xsl:with-param>
            </xsl:call-template>
            <!-- rows and cols atributes are not allowed in strict -->
            <xsl:attribute name="rows"><xsl:value-of select="@rows"/></xsl:attribute>
            <xsl:attribute name="cols"><xsl:value-of select="@cols"/></xsl:attribute>

            <xsl:if test="count(dri:row[@role='header']) &gt; 0">
	            <thead>
	                <xsl:apply-templates select="dri:row[@role='header']"/>
	            </thead>
            </xsl:if>
            <xsl:if test="count(dri:row[not(@role='header')]) &gt; 0">
                <tbody>
                    <xsl:apply-templates select="dri:row[not(@role='header')]"/>
                </tbody>
            </xsl:if>
        </table>
    </xsl:template>

    <xsl:template match="dri:options">
    </xsl:template>

    <xsl:template match="dri:meta">
    </xsl:template>

</xsl:stylesheet>
