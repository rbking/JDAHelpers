/**
 * Puts a quicklink button at the bottom of the 
 * list to make Return to In Transit easier
 * @param {*} frm 
 * @param {*} inputs 
 */
function integrateFormAssist(frm, inputs) {
	jQuery(frm).append(`        
        <table border="0" cellspacing="0" cellpadding="1">
            <tbody>
                <tr>
                    <td nowrap="yes">
                        <h2><u>QuickLinks</u>:</h2>
                    </td>
                    <td nowrap="yes">
                        <table id="buttonID0" border="1" cellspacing="0" cellpadding="0" class="buttonBorder">
                            <tbody>
                                <tr>
                                    <td id="buttonRegular" nowrap="yes" class="buttonText">
                                        <a href="javascript:submitMenu('UPLOAD_FILE_',false, document.IntegrationRequestListForm);" 
                                        tabindex="39" 
                                        onmouseover="i2uiSetMenuCoords (this,event)">&nbsp;&nbsp;Upload File&nbsp;&nbsp;
                                        </a>
                                    </td>                                                                                                                        
                                </tr>
                            </tbody>
                        </table>
                    </td>                    
                </tr>
            </tbody>
        </table>  
    `);
};