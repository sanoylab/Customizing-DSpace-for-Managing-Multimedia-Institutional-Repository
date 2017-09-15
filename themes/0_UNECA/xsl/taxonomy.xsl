<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet
        xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
        xmlns:dri="http://di.tamu.edu/DRI/1.0/"
        xmlns:mets="http://www.loc.gov/METS/"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
        xmlns:mods="http://www.loc.gov/mods/v3"
        xmlns:xlink="http://www.w3.org/TR/xlink/"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">


    <xsl:template match="dri:vocabulary" mode="compositeComponent">
        <span class="composite-vocabulary">
            <a href="javascript:void(null);">
                <xsl:attribute name="onclick">
                    <xsl:text>javascript:popUpVoc("</xsl:text>
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>/controlledvocabulary/selectvocabulary?name=</xsl:text>
                    <xsl:value-of select="../@n"/>
                    <xsl:text>&amp;vocabulary=</xsl:text>
                    <xsl:value-of select="."/>
                    <xsl:text>&amp;lang=</xsl:text>
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='language'][@qualifier='supported']"/>
                    <xsl:text>")</xsl:text>
                </xsl:attribute>
                <span class="controlledVocabularyLink clearfix">
                    <i18n:text>xmlui.Submission.submit.DescribeStep.subject_categories</i18n:text>
                </span>
            </a>
        </span>
    </xsl:template>

    <xsl:template match="dri:vocabulary">

    </xsl:template>

    <xsl:template match="dri:list[@n='submitcontrolledvocabulary']">
        <xsl:apply-templates select="." mode="submitcontrolledvocabulary"/>
    </xsl:template>

    <xsl:template match="dri:list[@n='submitcontrolledvocabulary_*']">
        <xsl:apply-templates select="." mode="submitcontrolledvocabulary"/>
    </xsl:template>

    <xsl:template match="dri:list" mode="submitcontrolledvocabulary">
        <xsl:apply-templates select="dri:head"/>
        <ul style="display:block;">
            <xsl:attribute name="id">
                <xsl:value-of select="translate(@id,'.','_')"/>
            </xsl:attribute>
            <xsl:apply-templates select="*[not(name()='head')]" mode="submitcontrolledvocabulary_nested"/>
        </ul>
    </xsl:template>

    <xsl:template match="dri:list[name(../..)='list']" mode="submitcontrolledvocabulary">
        <xsl:apply-templates select="dri:head"/>
        <ul style="display:none;">
            <xsl:attribute name="id">
                <xsl:value-of select="translate(@id,'.','_')"/>
            </xsl:attribute>
            <xsl:apply-templates select="*[not(name()='head')]" mode="submitcontrolledvocabulary_nested"/>
        </ul>
    </xsl:template>

    <xsl:template match="dri:item" mode="submitcontrolledvocabulary_nested">
        <li class="submitcontrolledvocabulary-list-item">
            <img class="submitcontrolledvocabulary" alt="search term">
                <xsl:attribute name="src">
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>/static/images/controlledvocabulary/f.gif</xsl:text>
                </xsl:attribute>
            </img>
            <xsl:variable name="cbId">
                <xsl:text>vocabulary_</xsl:text>
                <xsl:value-of select="dri:xref/@target"/>
            </xsl:variable>
            <input type="checkbox" id="{$cbId}" name="{$cbId}">
                <xsl:attribute name="value">
                    <xsl:value-of select="dri:xref"/>
                </xsl:attribute>
            </input>
            <label class="value" for="{$cbId}">
                <xsl:value-of select="dri:xref"/>
            </label>
            <!--<a class="value" href="javascript:void(null);">-->
            <!--<xsl:attribute name="onclick">-->
            <!--<xsl:text>javascript: i(this, '</xsl:text>-->
            <!--<xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='vocabulary'][@qualifier='name']"/>-->
            <!--<xsl:text>');</xsl:text>-->
            <!--</xsl:attribute>-->
            <!--<xsl:value-of select="dri:xref"/>-->
            <!--</a>-->
        </li>
    </xsl:template>

    <xsl:template match="dri:item[../dri:list]" mode="submitcontrolledvocabulary_nested">
        <li class="submitcontrolledvocabulary-list-item">
            <xsl:attribute name="id">
                <xsl:text>controlledvocabulary_li_</xsl:text>
                <xsl:value-of select="dri:xref/@target"/>
            </xsl:attribute>
            <img class="submitcontrolledvocabulary" alt="expand search term category">
                <xsl:attribute name="onclick">
                    <xsl:text>ec(this, '</xsl:text>
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="dri:xref/@target"/>
                    <xsl:text>');</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="src">
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:choose>
                        <xsl:when test="name(../..)='list' and not(name(following-sibling::node())='list')">
                            <xsl:text>/static/images/controlledvocabulary/f.gif</xsl:text>
                        </xsl:when>
                        <xsl:when test="name(../..)='list' and name(following-sibling::node())='list'">
                            <xsl:text>/static/images/controlledvocabulary/p.gif</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>/static/images/controlledvocabulary/m.gif</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </img>
            <xsl:choose>
                <xsl:when test="name(../..)='list' and not(name(following-sibling::node())='list')">
                    <a class="value" href="javascript:void(null);">
                        <xsl:attribute name="onclick">
                            <xsl:text>javascript: i(this, '</xsl:text>
                            <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='vocabulary'][@qualifier='name']"/>
                            <xsl:text>');</xsl:text>
                        </xsl:attribute>
                        <xsl:value-of select="dri:xref"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <span class="value">
                        <xsl:value-of select="dri:xref"/>
                    </span>
                </xsl:otherwise>
            </xsl:choose>
        </li>
    </xsl:template>

    <xsl:template match="dri:list/dri:list" priority="1" mode="submitcontrolledvocabulary_nested">
        <li class="submitcontrolledvocabulary-list">
            <xsl:apply-templates select="." mode="submitcontrolledvocabulary"/>
        </li>
    </xsl:template>

    <xsl:template match="dri:list[@n='searchcontrolledvocabulary']">
        <xsl:apply-templates select="." mode="searchcontrolledvocabulary"/>
    </xsl:template>

    <xsl:template match="dri:list[@n='searchcontrolledvocabulary_*']">
        <xsl:apply-templates select="." mode="searchcontrolledvocabulary"/>
    </xsl:template>

    <xsl:template match="dri:list" mode="searchcontrolledvocabulary">
        <xsl:apply-templates select="dri:head"/>
        <ul style="display:block;">
            <xsl:attribute name="id">
                <xsl:value-of select="translate(@id,'.','_')"/>
            </xsl:attribute>
            <xsl:apply-templates select="*[not(name()='head')]" mode="searchcontrolledvocabulary_nested"/>
        </ul>
    </xsl:template>


    <xsl:template match="dri:list[name(../..)='list']" mode="searchcontrolledvocabulary">
        <xsl:apply-templates select="dri:head"/>
        <ul style="display:none;">
            <xsl:attribute name="id">
                <xsl:value-of select="translate(@id,'.','_')"/>
            </xsl:attribute>
            <xsl:apply-templates select="*[not(name()='head')]" mode="searchcontrolledvocabulary_nested"/>
        </ul>
    </xsl:template>

    <xsl:template match="dri:item" mode="searchcontrolledvocabulary_nested">
        <li class="searchcontrolledvocabulary-list-item">
            <img class="searchcontrolledvocabulary" alt="search term">
                <xsl:attribute name="src">
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>/static/images/controlledvocabulary/f.gif</xsl:text>
                </xsl:attribute>
            </img>
            <xsl:variable name="cbId">
                <xsl:text>vocabulary_</xsl:text>
                <xsl:value-of select="dri:xref/@target"/>
            </xsl:variable>
            <input type="checkbox" id="{$cbId}" name="{$cbId}">
                <xsl:attribute name="value">
                    <xsl:value-of select="dri:xref"/>
                </xsl:attribute>
                <xsl:attribute name="onclick">
                    <xsl:text>javascript: i(this);</xsl:text>
                </xsl:attribute>
            </input>
            <!--<a class="value" href="javascript:void(null);">-->
            <!--<xsl:attribute name="onclick">-->
            <!--<xsl:text>javascript: i(this, '</xsl:text>-->
            <!--<xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='vocabulary'][@qualifier='name']"/>-->
            <!--<xsl:text>');</xsl:text>-->
            <!--</xsl:attribute>-->
            <label class="value" for="{$cbId}">
                <xsl:value-of select="dri:xref"/>
            </label>
            <!--</a>-->
        </li>
    </xsl:template>

    <xsl:template match="dri:item[../dri:list]" mode="searchcontrolledvocabulary_nested">
        <li class="searchcontrolledvocabulary-list-item">
            <xsl:attribute name="id">
                <xsl:text>controlledvocabulary_li_</xsl:text>
                <xsl:value-of select="dri:xref/@target"/>
            </xsl:attribute>
            <img class="searchcontrolledvocabulary" alt="expand search term category">
                <xsl:attribute name="onclick">
                    <xsl:text>ec(this, '</xsl:text>
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:text>', '</xsl:text>
                    <xsl:value-of select="dri:xref/@target"/>
                    <xsl:text>');</xsl:text>
                </xsl:attribute>
                <xsl:attribute name="src">
                    <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>
                    <xsl:choose>
                        <xsl:when test="name(../..)='list' and not(name(following-sibling::node())='list')">
                            <xsl:text>/static/images/controlledvocabulary/f.gif</xsl:text>
                        </xsl:when>
                        <xsl:when test="name(../..)='list' and name(following-sibling::node())='list'">
                            <xsl:text>/static/images/controlledvocabulary/p.gif</xsl:text>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:text>/static/images/controlledvocabulary/m.gif</xsl:text>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
            </img>
            <xsl:variable name="cbId">
                <xsl:text>vocabulary_</xsl:text>
                <xsl:value-of select="dri:xref/@target"/>
            </xsl:variable>
            <input type="checkbox" name="{$cbId}" id="{$cbId}">
                <xsl:attribute name="value">
                    <xsl:value-of select="dri:xref"/>
                </xsl:attribute>
                <xsl:attribute name="onclick">
                    <xsl:text>javascript: i(this);</xsl:text>
                </xsl:attribute>
            </input>
            <!--<a class="value" href="javascript:void(null);">-->
            <!--<xsl:attribute name="onclick">-->
            <!--<xsl:text>javascript: i(this, '</xsl:text>-->
            <!--<xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='vocabulary'][@qualifier='name']"/>-->
            <!--<xsl:text>');</xsl:text>-->
            <!--</xsl:attribute>-->
            <label class="value" for="{$cbId}">
                <xsl:value-of select="dri:xref"/>
            </label>
            <!--</a>-->
        </li>
    </xsl:template>

    <xsl:template match="dri:list/dri:list" priority="1" mode="searchcontrolledvocabulary_nested">
        <li class="searchcontrolledvocabulary-list">
            <xsl:apply-templates select="." mode="searchcontrolledvocabulary"/>
        </li>
    </xsl:template>


    <!-- Things I know:
        1. I can tell a field is multivalued if it has instances in it
        2. I can't really do that for composites, although I can check its
            component fields for condition 1 above.
        3. Fields can also be inside "form" lists, which is its own unique condition
    -->

  
    <xsl:template match="dri:field[dri:field/dri:instance | dri:params/@operations][dri:vocabulary]" priority="2">
        <!-- Create the first field normally -->
        <xsl:choose>
            <xsl:when test="@readonly">
                <span style="display:none;">
                    <xsl:apply-templates select="." mode="normalField"/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="." mode="normalField"/>
                <br/>
            </xsl:otherwise>
        </xsl:choose>

        <xsl:apply-templates select="dri:vocabulary" mode="compositeComponent"/>
        <xsl:apply-templates select="dri:help" mode="help"/>
        <xsl:apply-templates select="dri:error" mode="error"/>
        <xsl:if test="dri:instance">
            <div class="ds-previous-values">
                <!-- Iterate over the dri:instance elements contained in this field. The instances contain
                    stored values as either "interpreted", "raw", or "default" values. -->
                <xsl:call-template name="simpleFieldIterator">
                    <xsl:with-param name="position">1</xsl:with-param>
                </xsl:call-template>
                <!-- Conclude with a DELETE button if the delete operation is specified. This allows
                    removing one or more values stored for this field. -->
                <xsl:if test="contains(dri:params/@operations,'delete') and dri:instance">
                    <input type="submit" value="Remove selected" name="{concat(@n,'_delete')}" class="ds-button-field" />
                </xsl:if>
                <!-- Behind the scenes, add hidden fields for every instance set. This is to make sure that
                    the form still submits the information in those instances, even though they are no
                    longer encoded as HTML fields. The DRI Reference should contain the exact attributes
                    the hidden fields should have in order for this to work properly. -->
                <xsl:apply-templates select="dri:instance" mode="hiddenInterpreter"/>
            </div>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>