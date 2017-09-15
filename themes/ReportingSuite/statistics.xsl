<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
    xmlns:dri="http://di.tamu.edu/DRI/1.0/"
    version="1.0" exclude-result-prefixes="dri xsl">


    <xsl:template match="dri:div[@id='aspect.statistics.GraphEditor.div.javascriptvars' or @id='aspect.statistics.OldGraphEditor.div.javascriptvars']" priority="3">
        <script type="text/javascript">
            <xsl:for-each select="dri:p/dri:field">
                <xsl:text>var </xsl:text>
                <xsl:value-of select="@n"/>
                <xsl:text>= '</xsl:text>
                <i18n:text><xsl:value-of select="."/></i18n:text>
                <xsl:text>';</xsl:text>
            </xsl:for-each>
        </script>
    </xsl:template>


    <xsl:template match="dri:div[ancestor::dri:div[@id='aspect.statistics.GraphEditor.div.wrapper'] or ancestor::div[@id='aspect.statistics.OldGraphEditor.div.wrapper']]" priority="1">
        <xsl:apply-templates select="dri:head"/>
        <xsl:apply-templates select="@pagination">
            <xsl:with-param name="position">top</xsl:with-param>
        </xsl:apply-templates>
        <div>
            <xsl:if test="dri:p[@n='hidden-fields']/dri:field[@n='content']">
                <xsl:attribute name="content">
                    <xsl:value-of select="dri:p/dri:field[@n='content']"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-static-div</xsl:with-param>
            </xsl:call-template>
            <xsl:choose>
	           	<xsl:when test="child::node()">
	        		<xsl:apply-templates select="*[not(name()='head') and not(name()='field' and @n='content')]"/>
	            </xsl:when>
	       		<xsl:otherwise>
	       			&#160;
	       		</xsl:otherwise>
       		</xsl:choose>
        </div>
        <xsl:apply-templates select="@pagination">
            <xsl:with-param name="position">bottom</xsl:with-param>
        </xsl:apply-templates>
    </xsl:template>

    <!-- Interactive divs get turned into forms. The priority attribute on the template itself
        signifies that this template should be executed if both it and the one above match the
        same element (namely, the div element).

        Strictly speaking, XSL should be smart enough to realize that since one template is general
        and other more specific (matching for a tag and an attribute), it should apply the more
        specific once is it encounters a div with the matching attribute. However, the way this
        decision is made depends on the implementation of the XSL parser is not always consistent.
        For that reason explicit priorities are a safer, if perhaps redundant, alternative. -->
    <xsl:template match="dri:div[@interactive='yes' and (ancestor::dri:div[@id='aspect.statistics.GraphEditor.div.wrapper'] or ancestor::div[@id='aspect.statistics.OldGraphEditor.div.wrapper'])]" priority="2">
        <xsl:apply-templates select="dri:head"/>
        <xsl:apply-templates select="@pagination">
            <xsl:with-param name="position">top</xsl:with-param>
        </xsl:apply-templates>
        <form>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-interactive-div</xsl:with-param>
            </xsl:call-template>
            <xsl:attribute name="action"><xsl:value-of select="@action"/></xsl:attribute>
            <xsl:attribute name="method"><xsl:value-of select="@method"/></xsl:attribute>
            <xsl:if test="@method='multipart'">
            	<xsl:attribute name="method">post</xsl:attribute>
                <xsl:attribute name="enctype">multipart/form-data</xsl:attribute>
            </xsl:if>
            <xsl:attribute name="onsubmit">javascript:tSubmit(this);</xsl:attribute>
			<!--For Item Submission process, disable ability to submit a form by pressing 'Enter'-->
			<xsl:if test="starts-with(@n,'submit')">
				<xsl:attribute name="onkeydown">javascript:return disableEnterKey(event);</xsl:attribute>
            </xsl:if>
			<xsl:apply-templates select="*[not(name()='head')]"/>

        </form>
        <xsl:apply-templates select="@pagination">
            <xsl:with-param name="position">bottom</xsl:with-param>
        </xsl:apply-templates>
    </xsl:template>

    <xsl:template match="dri:item[contains(@rend, 'addallnonelinks')]">
        <li>
            <xsl:call-template name="standardAttributes"/>
            <div class="allNoneLinkDiv">
                <a>
                    <xsl:attribute name="onclick">selectAllNone('<xsl:value-of select="translate(@id, '.', '_')"/>', true);</xsl:attribute>
                    <i18n:text>xmlui.reporting-suite.statistics.graph-editor.count-hits-for.select.all</i18n:text>
                </a>
                <a style="margin-left: 5px;">
                    <xsl:attribute name="onclick">selectAllNone('<xsl:value-of select="translate(@id, '.', '_')"/>', false);</xsl:attribute>
                    <i18n:text>xmlui.reporting-suite.statistics.graph-editor.count-hits-for.select.none</i18n:text>
                </a>
            </div>

            <xsl:apply-templates/>

            <div class="allNoneLinkDiv" style="margin-top: 5px;">
                <a>
                    <xsl:attribute name="onclick">selectAllNone('<xsl:value-of select="translate(@id, '.', '_')"/>', true);</xsl:attribute>
                    <i18n:text>xmlui.reporting-suite.statistics.graph-editor.count-hits-for.select.all</i18n:text>
                </a>
                <a style="margin-left: 5px;">
                    <xsl:attribute name="onclick">selectAllNone('<xsl:value-of select="translate(@id, '.', '_')"/>', false);</xsl:attribute>
                    <i18n:text>xmlui.reporting-suite.statistics.graph-editor.count-hits-for.select.none</i18n:text>
                </a>
            </div>
        </li>
    </xsl:template>


  <xsl:template match="dri:div[starts-with(@id, 'aspect.statistics.StatletTransformer.div.graph')]" priority="3">
      <xsl:apply-templates select="dri:head"/>
      <div>
          <xsl:for-each select="dri:list[@id='aspect.statistics.StatletTransformer.list.divattrs']/dri:item">
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

    <xsl:template match="dri:div[@id='aspect.statistics.StatletTransformer.div.tablewrapper']" priority="3">
        <div>
            <xsl:for-each select="dri:list[@id='aspect.statistics.StatletTransformer.list.divattrs']/dri:item">
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

  <xsl:template match="dri:div[@id='aspect.statistics.editorparts.GraphSettingsTransformer.div.graph'] | dri:div[@id='aspect.statistics.editorparts.GraphTransformer.div.graph'] | dri:div[@id='aspect.statistics.OldGraphEditor.div.graph']" priority="3">
      <xsl:apply-templates select="dri:head"/>
      <div>
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

  <xsl:template match="dri:cell[@rend='headercell']/dri:xref">

      <table>
          <tr>
              <td>
                  <div class="colorStatusDiv">
                      <img src="{concat($context-path, '/themes/ReportingSuite/images/colorSpacer.gif')}">
                          <xsl:attribute name="id">
                              <xsl:text>aspect_statistics_GraphEditor_img_</xsl:text>
                              <xsl:value-of select="parent::node()/@n"/>
                          </xsl:attribute>
                          <xsl:attribute name="style">
                              <xsl:text>background-color: </xsl:text>
                              <xsl:value-of select="."/>
                              <xsl:text>;</xsl:text>
                          </xsl:attribute>
                      </img>
                  </div>
              </td>
              <td>
                  <xsl:value-of select="@target"/>
              </td>
          </tr>
      </table>
  </xsl:template>

    <!-- The handling of component fields, that is fields that are part of a composite field type -->
    <xsl:template match="dri:field" mode="compositeComponentCustom">
        <xsl:choose>
        	<xsl:when test="@type = 'checkbox'  or @type='radio'">
                <xsl:for-each select="dri:option">
                    <label>
                        <input>
                            <xsl:attribute name="name"><xsl:value-of select="../@n"/></xsl:attribute>
                            <xsl:attribute name="type"><xsl:value-of select="../@type"/></xsl:attribute>
                            <xsl:attribute name="value"><xsl:value-of select="@returnValue"/></xsl:attribute>
                            <xsl:if test="../dri:value[@type='option'][@option = current()/@returnValue]">
                                <xsl:attribute name="checked">checked</xsl:attribute>
                            </xsl:if>
                            <xsl:if test="../@disabled='yes'">
                                <xsl:attribute name="disabled">disabled</xsl:attribute>
                            </xsl:if>
                        </input>
                        <xsl:apply-templates />
                    </label>
                    <br />
                </xsl:for-each>
                <xsl:apply-templates select="dri:label" mode="compositeComponentCustom"/>
        	</xsl:when>
        	<xsl:otherwise>
		        <label class="ds-composite-component">
                    <xsl:if test="position()=last()">
                        <xsl:attribute name="class">ds-composite-component last</xsl:attribute>
                    </xsl:if>
                    <!--<xsl:apply-templates select="dri:field/dri:help" mode="compositeComponent"/>-->
                    <xsl:apply-templates select="dri:label" mode="compositeComponentCustom"/>
                    <xsl:text>:</xsl:text>
                    <!--<br />-->
                    <!--<br/>-->
		        </label>
                <xsl:apply-templates select="." mode="normalField"/>
            </xsl:otherwise>
       	</xsl:choose>
    </xsl:template>


    <xsl:template match="dri:item[@id = 'aspect.statistics.editorparts.GraphSettingsTransformer.item.dimensions']">
        <li>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">
                    <xsl:text>ds-form-item </xsl:text>
                <xsl:choose>
                    <!-- Makes sure that the dark always falls on the last item -->
                    <xsl:when test="count(../dri:item) mod 2 = 0">
                        <xsl:if test="count(../dri:item) > 3">
                            <xsl:if test="(count(preceding-sibling::dri:item) mod 2 = 0)">even </xsl:if>
                            <xsl:if test="(count(preceding-sibling::dri:item) mod 2 = 1)">odd </xsl:if>
                        </xsl:if>
                    </xsl:when>
                    <xsl:when test="count(../dri:item) mod 2 = 1">
                        <xsl:if test="count(../dri:item) > 3">
                            <xsl:if test="(count(preceding-sibling::dri:item) mod 2 = 1)">even </xsl:if>
                            <xsl:if test="(count(preceding-sibling::dri:item) mod 2 = 0)">odd </xsl:if>
                        </xsl:if>
                    </xsl:when>
                </xsl:choose>
                <!-- The last row is special if it contains only buttons -->
                <xsl:if test="position()=last() and dri:field[@type='button'] and not(dri:field[not(@type='button')])">last </xsl:if>
                <!-- The row is also tagged specially if it contains another "form" list -->
                <xsl:if test="dri:list[@type='form']">sublist </xsl:if>
                </xsl:with-param>
            </xsl:call-template>

            <xsl:for-each select="dri:field">
                <xsl:choose>
                    <xsl:when test="@type = 'checkbox'  or @type='radio'">
                        <xsl:for-each select="dri:option">
                            <label>
                                <input>
                                    <xsl:attribute name="name"><xsl:value-of select="../@n"/></xsl:attribute>
                                    <xsl:attribute name="type"><xsl:value-of select="../@type"/></xsl:attribute>
                                    <xsl:attribute name="value"><xsl:value-of select="@returnValue"/></xsl:attribute>
                                    <xsl:if test="../dri:value[@type='option'][@option = current()/@returnValue]">
                                        <xsl:attribute name="checked">checked</xsl:attribute>
                                    </xsl:if>
                                    <xsl:if test="../@disabled='yes'">
                                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                                    </xsl:if>
                                </input>
                                <xsl:apply-templates />
                            </label>
                            <br />
                        </xsl:for-each>
                        <xsl:apply-templates select="dri:label" mode="compositeComponentCustom"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <label class="ds-form-label">
                            <xsl:if test="position()=last()">
                                <xsl:attribute name="class">ds-composite-component last</xsl:attribute>
                            </xsl:if>
                            <xsl:apply-templates select="dri:field/dri:help" mode="compositeComponent"/>
                            <xsl:apply-templates select="dri:label" mode="compositeComponentCustom"/>
                            <xsl:text>:</xsl:text>
                        </label>
                        <div class="ds-form-content test">

                            <xsl:for-each select="dri:field">
                                <xsl:apply-templates select="." mode="compositeComponentCustom"/>
                            </xsl:for-each>
                        </div>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </li>
    </xsl:template>

    <xsl:template match="dri:field/dri:label" mode="compositeComponentCustom">
        <xsl:apply-templates />
    </xsl:template>








    <!--<xsl:template match="dri:div[starts-with(@id,'statistics.GraphEditor.div')]">-->
        <!--<xsl:element name="div">-->
        <!--<xsl:attribute name="class">testing</xsl:attribute>-->
        <!--<xsl:apply-templates />-->
        <!--</xsl:element>-->
    <!--</xsl:template>-->




    <!-- The first (and most complex) case of the header tag is the one used for divisions. Since divisions can
        nest freely, their headers should reflect that. Thus, the type of HTML h tag produced depends on how
        many divisions the header tag is nested inside of. -->
    <!-- The font-sizing variable is the result of a linear function applied to the character count of the heading text -->
    <xsl:template match="dri:div[starts-with(@id,'aspect.statistics.GraphEditor.div')]/dri:head">
        <xsl:variable name="head_count" select="count(ancestor::dri:div)"/>
        <!-- with the help of the font-sizing variable, the font-size of our header text is made continuously variable based on the character count -->
        <xsl:variable name="font-sizing" select="365 - $head_count * 80 - string-length(current())"></xsl:variable>
            <xsl:element name="h{$head_count}">
                <!-- in case the chosen size is less than 120%, don't let it go below. Shrinking stops at 120% -->
                <!--<xsl:choose>-->
                    <xsl:attribute name="style">font-size: 190%;</xsl:attribute>
                    <!--<xsl:attribute name="style">font-size: <xsl:value-of select="$font-sizing"/>%;</xsl:attribute>-->
                <!--</xsl:choose>-->
                <xsl:call-template name="standardAttributes">
                    <xsl:with-param name="class">ds-div-head</xsl:with-param>
                </xsl:call-template>

                <xsl:element name="a">
                    <xsl:attribute name="id">
                        <xsl:value-of select="translate(../@id,'.','_')"/>
                        <xsl:text>_head_link</xsl:text>
                    </xsl:attribute>
                    <!--<xsl:attribute name="class">foldLink</xsl:attribute>-->
                    <!--<xsl:attribute name="href">#</xsl:attribute>-->
                    <!--<xsl:attribute name="onclick">-->
                        <!--<xsl:text>$('</xsl:text>-->
                        <!--<xsl:value-of select="translate(../@id,'.','_')"/>-->
                        <!--<xsl:text>').toggle();</xsl:text>-->
                    <!--</xsl:attribute>-->

                    <!--</xsl:attribute>-->
                    <xsl:element name="img">
                        <xsl:attribute name="id">
                            <xsl:value-of select="translate(../@id,'.','_')"/>
                            <xsl:text>_head_img</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="src">
                            <xsl:value-of select="concat($context-path, '/themes/ReportingSuite/images/header-collapse-18.png')" />
                            <!--<xsl:text>../themes/ReportingSuite/images/header-expand-20.png</xsl:text>-->
                        </xsl:attribute>
                        <xsl:attribute name="altsrc">
                            <!--<xsl:text>../themes/ReportingSuite/images/header-collapse-18.png</xsl:text>-->
                            <xsl:value-of select="concat($context-path, '/themes/ReportingSuite/images/header-expand-20.png')" />
                        </xsl:attribute>
                        <xsl:attribute name="style">
                            margin-bottom:-1px;
                            margin-right:3px;
                        </xsl:attribute>
                    </xsl:element>

                    <xsl:apply-templates />
                </xsl:element>
            </xsl:element>
        </xsl:template>


    <!--<xsl:template match="dri:p[@id='statistics.GraphEditor.field.csvExportButton']/dri:field">-->
            <!--<xsl:element name="input">-->
                <!--<xsl:attribute name="type">image</xsl:attribute>-->
                <!--<xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute>-->
                <!--<xsl:attribute name="value">export</xsl:attribute>-->
                <!--<xsl:attribute name="src">../themes/ReportingSuite/images/spreadsheet.png</xsl:attribute>-->
            <!--</xsl:element>-->
            <!--<xsl:apply-templates />-->
    <!--</xsl:template>-->

    <!--<xsl:template match="dri:field[statistics.GraphEditor.field.csv]" priority="1">-->
    <!--<xsl:template match="dri:field[starts-with(@id, 'statistics.GraphEditor.field.csv')]">-->
    <!--<xsl:template match="dri:field"  mode="compositeComponent">-->
    <!--<xsl:template match="dri:field" mode="formComposite">-->
    <xsl:template match="dri:p[@id='aspect.statistics.OldGraphEditor.p.csv']">
        <xsl:element name="p">
            <xsl:call-template name="standardAttributes"/>
            <!--<xsl:apply-templates select="self::node()[not(@id = 'statistics.OldGraphEditor.p.csv')]" />-->
        <!--<xsl:apply-templates select="dri:p" />-->

        <!--This makes sure that all the fields that do NOT comply to the id are copyed with default values-->
        <xsl:apply-templates select="dri:field[@id != 'aspect.statistics.OldGraphEditor.field.csv']"/>
        <!--<xsl:apply-templates select="*[@id != 'statistics.OldGraphEditor.field.csv']"/>-->
        <xsl:choose>
            <xsl:when test="dri:field[@id='aspect.statistics.OldGraphEditor.field.csv']">
                <xsl:element name="input">
                    <xsl:attribute name="type">image</xsl:attribute>
                    <xsl:attribute name="id">aspect_statistics_GraphEditor_field_csv</xsl:attribute>
                    <xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
                    <xsl:attribute name="src">
                        <xsl:value-of select="concat($context-path, '/themes/ReportingSuite/images/spreadsheet-38.png')" />
                    </xsl:attribute>
                    <xsl:attribute name="style">vertical-align: middle;</xsl:attribute>
                </xsl:element>
            </xsl:when>
            <!--<xsl:otherwise>-->
                <!--<xsl:apply-templates />-->
            <!--</xsl:otherwise>-->
        </xsl:choose>
            <a>
                <xsl:attribute name="id">aspect_statistics_OldGraphEditor_field_csv_a</xsl:attribute>
                <xsl:attribute name="style">cursor:pointer;</xsl:attribute>
                <i18n:text>xmlui.reporting-suite.statistics.graph-editor.export.csv</i18n:text>
            </a>
        </xsl:element>
    </xsl:template>

    <xsl:template match="dri:p[@id='aspect.statistics.editorparts.DataTableTransformer.p.csv']">
        <xsl:element name="p">
            <xsl:call-template name="standardAttributes"/>
            <!--<xsl:apply-templates select="self::node()[not(@id = 'statistics.editorparts.DataTableTransformer.p.csv')]" />-->
        <!--<xsl:apply-templates select="dri:p" />-->

        <!--This makes sure that all the fields that do NOT comply to the id are copyed with default values-->
        <xsl:apply-templates select="dri:field[@id != 'aspect.statistics.editorparts.DataTableTransformer.field.csv']"/>
        <!--<xsl:apply-templates select="*[@id != 'statistics.editorparts.DataTableTransformer.field.csv']"/>-->
        <xsl:choose>
            <xsl:when test="dri:field[@id='aspect.statistics.editorparts.DataTableTransformer.field.csv']">
                <xsl:element name="input">
                    <xsl:attribute name="type">image</xsl:attribute>
                    <xsl:attribute name="id">aspect_statistics_editorparts_DataTableTransformer_field_csv</xsl:attribute>
                    <xsl:attribute name="value"><xsl:value-of select="@value"/></xsl:attribute>
                    <xsl:attribute name="src">
                        <xsl:value-of select="concat($context-path, '/themes/ReportingSuite/images/spreadsheet-38.png')" />
                    </xsl:attribute>
                    <xsl:attribute name="style">vertical-align: middle;</xsl:attribute>
                </xsl:element>
            </xsl:when>
            <!--<xsl:otherwise>-->
                <!--<xsl:apply-templates />-->
            <!--</xsl:otherwise>-->
        </xsl:choose>
            <a>
                <xsl:attribute name="id">aspect_statistics_editorparts_DataTableTransformer_field_csv_a</xsl:attribute>
                <xsl:attribute name="style">cursor:pointer;</xsl:attribute>
                <i18n:text>xmlui.reporting-suite.statistics.graph-editor.export.csv</i18n:text>
            </a>
        </xsl:element>
    </xsl:template>

            <!--<xsl:element name="input">-->
                <!--<xsl:attribute name="type">image</xsl:attribute>-->
                <!--<xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute>-->
                <!--<xsl:attribute name="value">export</xsl:attribute>-->
                <!--<xsl:attribute name="src">../themes/ReportingSuite/images/spreadsheet.png</xsl:attribute>-->
            <!--</xsl:element>-->
            <!--<input type="image" src="../themes/ReportingSuite/images/spreadsheet.png" value="Export table as CSV file" name="csv" class="ds-button-field" id="statistics_GraphEditor_field_csv"/>-->
            <!--<xsl:apply-templates />-->
    <!--</xsl:template>-->

    <xsl:template match="dri:list[@id='aspect.statistics.OldGraphEditor.list.dataset_items_1_ou' or @id='aspect.statistics.OldGraphEditor.list.dataset_items_2_ou']">
       <li>
           <ul>
               <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
               <xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
               <xsl:call-template name="standardAttributes"/>
               <xsl:apply-templates/>
           </ul>
       </li>
    </xsl:template>


    <xsl:template match="dri:cell[@id='aspect.statistics.StatletTransformer.cell.spacer']">
        <td>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:text>&#160;</xsl:text>
        </td>
    </xsl:template>

    <xsl:template match="dri:p[@id='aspect.statistics.StatletTransformer.p.statslink']">
        <p>
            <xsl:for-each select="dri:xref">
                <table>
                    <tr>
                        <td>
                            <img>
                                <xsl:attribute name="src">
                                    <xsl:value-of select="concat($context-path, '/themes/ReportingSuite/images/stats.gif')"/>
                                </xsl:attribute>
                                <xsl:attribute name="style">cursor: pointer;</xsl:attribute>    
                            </img>
                        </td>
                        <td>
                            <a>
                                <xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>

                                <xsl:attribute name="i18n:attr">href</xsl:attribute>
                                <!--<xsl:text>&lt;img&gt; src='../../themes/ReportingSuite/images/stats.gif'&lt;/img&gt;</xsl:text>-->
                                <i18n:text><xsl:value-of select="."/></i18n:text>
                            </a>
                        </td>
                    </tr>
                </table>
            </xsl:for-each>
        </p>
    </xsl:template>

    <xsl:template match="dri:item[@id = 'aspect.statistics.editorparts.GraphSettingsTransformer.item.btn']">
        <li>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-form-item odd</xsl:with-param>
            </xsl:call-template>
            <div name="{dri:field/@n}" class="graph-settings-button ui-corner-all"
                      onmouseover="$(this).addClass('button-hover');" onmouseout="$(this).removeClass('button-hover');"
                      onclick="toggleHiddenPrefs();return false;">
                <xsl:attribute name="title">
                    <xsl:value-of select="dri:field/dri:value"/>
                </xsl:attribute>
                <xsl:if test="dri:field/dri:value/i18n:text">
                    <xsl:attribute name="i18n:attr">title</xsl:attribute>
                </xsl:if>
                <span class="ui-icon ui-icon-wrench">&#160;</span>
            </div>

        </li>

    </xsl:template>

    <xsl:template match="dri:p[dri:field/@id = 'aspect.statistics.editorparts.TimeFilterTransformer.field.update']">
        <div name="{dri:field/@n}" class="time-update-button ui-corner-all" onmouseover="$(this).addClass('button-hover');" onmouseout="$(this).removeClass('button-hover');" onclick="updateData();return false;">
            <xsl:choose>
                <xsl:when test="dri:field/dri:value/i18n:text">
                    <i18n:text><xsl:value-of select="dri:field/dri:value"/></i18n:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="dri:field/dri:value"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>

    <xsl:template match="dri:p[dri:field/@id = 'aspect.statistics.editorparts.UpdateButtonTransformer.field.update']">
        <div name="{dri:field/@n}" class="update-button ui-corner-all" onmouseover="$(this).addClass('button-hover');" onmouseout="$(this).removeClass('button-hover');" onclick="updateData();return false;">
            <xsl:choose>
                <xsl:when test="dri:field/dri:value/i18n:text">
                    <i18n:text><xsl:value-of select="dri:field/dri:value"/></i18n:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="dri:field/dri:value"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>

    <xsl:template match="dri:p[dri:field/@id='aspect.statistics.editorparts.BagTransformer.field.add_bitstreams' or dri:field/@id='aspect.statistics.editorparts.BagTransformer.field.add_items' or dri:field/@id='aspect.statistics.editorparts.BagTransformer.field.add_epersons' or dri:field/@id='aspect.statistics.editorparts.BagTransformer.field.add_groups']">
        <div name="{dri:field/@n}" class="add-to-bag-button ui-corner-all"  rel="#aspect_statistics_editorparts_BagTransformer_div_overlaydiv" onmouseover="$(this).addClass('button-hover');" onmouseout="$(this).removeClass('button-hover');" >
            <xsl:choose>
                <xsl:when test="dri:field/dri:value/i18n:text">
                    <i18n:text><xsl:value-of select="dri:field/dri:value"/></i18n:text>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="dri:field/dri:value"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>

    <xsl:template match="dri:cell[dri:field/@id = 'aspect.statistics.editorparts.DataTableTransformer.field.swapRowsAndCols']">
        <td>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-table-cell
                    <xsl:if test="(position() mod 2 = 0)">even</xsl:if>
                    <xsl:if test="(position() mod 2 = 1)">odd</xsl:if>
                </xsl:with-param>
            </xsl:call-template>
            <xsl:if test="@rows">
                <xsl:attribute name="rowspan">
                    <xsl:value-of select="@rows"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@cols">
                <xsl:attribute name="colspan">
                    <xsl:value-of select="@cols"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:variable name="swapAction">
                <xsl:choose>
                    <xsl:when test="dri:field/@disabled = 'yes'">
                        <xsl:text>true</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>false</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>
            <input name="{dri:field/@n}" type="button" onclick="swap({$swapAction}); return false;">
                <xsl:attribute name="value">
                    <xsl:value-of select="dri:field/dri:value"/>
                </xsl:attribute>
                <xsl:if test="dri:field/dri:value/i18n:text">
                    <xsl:attribute name="i18n:attr">value</xsl:attribute>
                </xsl:if>
            </input>
        </td>
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.statistics.editorparts.TimeFilterTransformer.div.timefilter']//dri:xref[@target='showOptions']" priority="1">
        <a onclick="showTimeFilterOptions();return false;">
            <xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:apply-templates />
        </a>
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.statistics.editorparts.TimeFilterTransformer.div.timefilter']//dri:xref[@target='hideOptions']" priority="1">
        <a onclick="hideTimeFilterOptions();return false;">
            <xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:apply-templates />
        </a>
    </xsl:template>


    <xsl:template match="dri:div[@id='aspect.statistics.editorparts.ContentTreeTransformer.div.treecontentdiv']" priority="3">
        <div>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-static-div</xsl:with-param>
            </xsl:call-template>
            <xsl:choose>
	            <!--  does this element have any children -->
	           	<xsl:when test="child::node()">
                       <xsl:apply-templates select="*[not(self::dri:head or self::dri:list[@id = 'aspect.statistics.editorparts.ContentTreeTransformer.list.generateid1'])]"/>
	            </xsl:when>
	       		<!-- if no children are found we add a space to eliminate self closing tags -->
	       		<xsl:otherwise>
	       			&#160;
	       		</xsl:otherwise>
       		</xsl:choose>
        </div>
    </xsl:template>

    <xsl:template match="dri:cell[@id = 'aspect.statistics.editorparts.ContentTreeTransformer.cell.label']" priority="3">
        <th>
            <xsl:call-template name="standardAttributes">
                <xsl:with-param name="class">ds-table-header-cell
                    <xsl:if test="(position() mod 2 = 0)">even</xsl:if>
                    <xsl:if test="(position() mod 2 = 1)">odd</xsl:if>
                </xsl:with-param>
            </xsl:call-template>
            <xsl:if test="@rows">
                <xsl:attribute name="rowspan">
                    <xsl:value-of select="@rows"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@cols">
                <xsl:attribute name="colspan">
                    <xsl:value-of select="@cols"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates />
        </th>
        <td>
            <xsl:attribute name="class">ds-table-cell
                <xsl:if test="(position() mod 2 = 1)">even</xsl:if>
                <xsl:if test="(position() mod 2 = 0)">odd</xsl:if>
            </xsl:attribute>
            <xsl:if test="@rows">
                <xsl:attribute name="rowspan">
                    <xsl:value-of select="@rows"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="@cols">
                <xsl:attribute name="colspan">
                    <xsl:value-of select="@cols"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="//dri:list[@id='aspect.statistics.editorparts.ContentTreeTransformer.list.generateid1']"/>
        </td>
    </xsl:template>

    <xsl:template match="dri:xref[@target = 'checkAll']">
        <a onclick="checkAll(this); return false;">
            <xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:apply-templates />
        </a>
    </xsl:template>

    <xsl:template match="dri:xref[@target = 'checkNone']">
        <a onclick="checkNone(this); return false;">
            <xsl:attribute name="href"><xsl:value-of select="@target"/></xsl:attribute>
            <xsl:attribute name="class"><xsl:value-of select="@rend"/></xsl:attribute>
            <xsl:apply-templates />
        </a>
    </xsl:template>

    <xsl:template match="dri:field[ancestor::dri:div[@id='aspect.statistics.GraphEditor.div.wrapper'] or ancestor::div[@id='aspect.statistics.OldGraphEditor.div.wrapper']]" mode="compositeComponent">
        <xsl:choose>
        	<xsl:when test="@type = 'checkbox'  or @type='radio'">
       		    <xsl:apply-templates select="." mode="normalField"/>
	            <br/>
                <xsl:apply-templates select="dri:label" mode="compositeComponent"/>
            </xsl:when>
        	<xsl:otherwise>
                <span class="ds-composite-label-value-combo">
                    <xsl:if test="position()=last()">
                        <xsl:attribute name="class">ds-composite-label-value-combo last</xsl:attribute>
                    </xsl:if>
                    <xsl:if test="dri:label">
                        <label class="ds-composite-component">
                            <!--<xsl:apply-templates select="dri:field/dri:help" mode="compositeComponent"/>-->
                            <xsl:apply-templates select="dri:label" mode="compositeComponent"/>
                            <xsl:text>:</xsl:text>
                            <br/>
                        </label>
                    </xsl:if>
                    <xsl:apply-templates select="." mode="normalField"/>
                </span>
            </xsl:otherwise>
       	</xsl:choose>
    </xsl:template>

    <xsl:template match="dri:row[@role='header'][@rend='dttable-header']" priority="2">
        <thead>
            <tr>
                <xsl:call-template name="standardAttributes">
                    <xsl:with-param name="class">ds-table-header-row</xsl:with-param>
                </xsl:call-template>
                <xsl:apply-templates />
            </tr>
        </thead>
    </xsl:template>


</xsl:stylesheet>