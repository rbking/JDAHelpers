/**
 * Puts a quicklink button at the bottom of the 
 * list to make confirmation reversals easier
 * @param {*} frm 
 * @param {*} inputs 
 */
function loadFormAssist(frm, inputs) {
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
                                        <a href="javascript:if(validRowsSelected(document.LoadList,'ONEPLUS','2', tbo)) submitMenu('CONFIRMATION_REVERSAL_',false, document.LoadList);" 
                                        tabindex="39" 
                                        onmouseover="i2uiSetMenuCoords (this,event)">&nbsp;&nbsp;Confirmation Reversal&nbsp;&nbsp;
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