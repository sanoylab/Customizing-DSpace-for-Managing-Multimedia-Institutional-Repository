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

    <xsl:output indent="yes"/>


    <xsl:template match="dri:div[@id='main-areas-of-work']/dri:div">
        <div class="row visible-xs">
            <div class="row">
                <xsl:apply-templates select="dri:div[position() = 1]"/>
                <xsl:apply-templates select="dri:div[position() = 2]"/>
            </div>
            <div class="row">
                <xsl:apply-templates select="dri:div[position() = 3]"/>
                <xsl:apply-templates select="dri:div[position() = 4]"/>
            </div>
            <div class="row">
                <xsl:apply-templates select="dri:div[position() = 5]"/>
                <xsl:apply-templates select="dri:div[position() = 6]"/>
            </div>
            <div class="row">
                <xsl:apply-templates select="dri:div[position() = 7]"/>
            </div>
        </div>
        <div class="row hidden-xs">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='main-areas-of-work']/dri:div/dri:div[position() &lt; 5]">
        <div class="col-xs-6 col-sm-3 col-md-7ths">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='main-areas-of-work']/dri:div/dri:div[position() = 5]">
        <div class="col-xs-6 col-sm-5 col-md-7ths">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='main-areas-of-work']/dri:div/dri:div[position() = 6]">
        <div class="col-xs-6 col-sm-2 col-md-7ths">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="dri:div[@id='main-areas-of-work']/dri:div/dri:div[position() = 7]">
        <div class="col-xs-12 col-sm-5 col-md-7ths">
            <xsl:apply-templates/>
        </div>
    </xsl:template>

</xsl:stylesheet>