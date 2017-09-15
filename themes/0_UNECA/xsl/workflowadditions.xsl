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


    <xsl:template match="dri:p[contains(@rend, 'item-view-toggle item')]">
        <table width="100%" class="itemToggleView">
            <tr>
                <td width="99%">
                    &#160;
                    <!--<xsl:apply-templates/>-->
                </td>
                <xsl:if test="/dri:document/dri:body/dri:div/dri:div[@id='aspect.workflowadditions.BackToSubmissionButtonTransformer.div.send_to_submission_form']">
                    <td width="1%">
                        <xsl:apply-templates select="/dri:document/dri:body/dri:div/dri:div[@id='aspect.workflowadditions.BackToSubmissionButtonTransformer.div.send_to_submission_form']"/>
                    </td>
                </xsl:if>
                <xsl:if test="/dri:document/dri:body/dri:div/dri:div[@id='aspect.workflowadditions.DeleteItemButtonTransformer.div.delete_form']">
                    <td width="1%">
                        <xsl:apply-templates select="/dri:document/dri:body/dri:div/dri:div[@id='aspect.workflowadditions.DeleteItemButtonTransformer.div.delete_form']"/>
                    </td>
                </xsl:if>
            </tr>
        </table>
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.workflowadditions.DeleteItemButtonTransformer.div.item-view-submission-addition']">
    </xsl:template>

    <xsl:template match="dri:div[@id='aspect.workflowadditions.BackToSubmissionButtonTransformer.div.item-view-submission-addition']">
    </xsl:template>

</xsl:stylesheet>