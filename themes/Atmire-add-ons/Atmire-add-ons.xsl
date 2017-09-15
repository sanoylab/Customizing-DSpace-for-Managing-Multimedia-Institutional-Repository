<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
    xmlns:dri="http://di.tamu.edu/DRI/1.0/"
    xmlns:mets="http://www.loc.gov/METS/"
    xmlns:xlink="http://www.w3.org/TR/xlink/"
    version="1.0">

    <xsl:output indent="yes"/>

    <xsl:template match="dri:p[@n='atmire_maximizebutton']">
        <xsl:for-each select="dri:field">
            <img
                    alt="Full Screen"
                    name="maximize"
                    onFocus="this.blur();"
                    src="{concat($context-path, '/themes/Atmire-add-ons/images/view-fullscreen.png')}"
                    altbg="{concat($context-path, '/themes/Atmire-add-ons/images/view-restore.png')}">
                <xsl:attribute name="id"><xsl:value-of select="dri:field/@id"/></xsl:attribute>
                <xsl:attribute name="class">
                    <xsl:value-of select="@rend"/>
                </xsl:attribute>
                <xsl:call-template name="standardAttributes"/>
            </img>
        </xsl:for-each>
    </xsl:template>

    <xsl:template match="dri:p[@rend='foldableHelpButton']">
        <img>
            <xsl:attribute name="id">
                <xsl:value-of select="translate(dri:field/@id,'.','_')"/>
            </xsl:attribute>
            <xsl:attribute name="name">
                <xsl:value-of select="dri:field/@n"/>
            </xsl:attribute>
            <xsl:attribute name="src">
                <xsl:value-of select="concat($context-path, '/themes/Atmire-add-ons/images/help.png')" />
            </xsl:attribute>
            <!--<xsl:variable name="tooltip">        -->
                <!--<i18n:text>xmlui.metadataquality.SearchControls.tooltip.add</i18n:text>-->
            <!--</xsl:variable>-->
            <xsl:attribute name="alt">
                <xsl:text>help</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="title">
                <xsl:text>help</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="class">
                <xsl:value-of select="@rend"/>
            </xsl:attribute>
        </img>
    </xsl:template>




    <xsl:template match="dri:div[@rend='foldableHelp']">
        <!--Don't render an empty help message-->
        <xsl:if test="not(string-length(dri:p) = 0)">
            <div>
                <xsl:attribute name="id">
                    <xsl:value-of select="translate(@id,'.','_')"/>
                </xsl:attribute>
                <xsl:attribute name="class">
                    <xsl:value-of select="@rend"/>
                </xsl:attribute>
                <!--<xsl:call-template name="standardAttributes"/>-->
                <table cellspacing="0" cellpadding="0" class="leftpopup" style="width: 551px;">
                    <tr>
                        <td class="bottompopup_knob" style="">
                            <!--<img src="concat($context-path, '/themes/MetadataQualityModule/images/topsideknob.gif')" />-->
                            <img style="margin-bottom: -3px;">
                                <xsl:attribute name="src">
                                    <!--<xsl:value-of select="concat($context-path, '/themes/MetadataQualityModule/images/topsideknob.gif')" />-->
                                    <xsl:value-of select="concat($context-path, '/themes/Atmire-add-ons/images/balloon_grey.gif')" />
                                </xsl:attribute>
                            </img>
                        </td>
                    </tr>
                    <tr>
                        <td class="leftpopup_container">
                            <div>
                                <xsl:apply-templates />
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </xsl:if>
        <!--<xsl:apply-templates />-->
    </xsl:template>

</xsl:stylesheet>
