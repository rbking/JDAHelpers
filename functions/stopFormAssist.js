/**
 * Helps Select Stops 1 or 2
 * @param {*} frm 
 * @param {*} inputs 
 */
function stopFormAssist(frm, inputs) {
    jQuery(frm).append(`
        <table border="0" cellspacing="0" cellpadding="1">
            <tbody>
                <tr>
                    <td nowrap="yes">
                        <table id="buttonID0" border="1" cellspacing="0" cellpadding="0" class="buttonBorder">
                            <tbody>
                                <tr>
                                    <td id="buttonRegular" nowrap="yes" class="buttonText">
                                        <a href="javascript: onSelectMatchingStops('1');" 
                                        tabindex="39" 
                                        onmouseover="i2uiSetMenuCoords (this,event)">&nbsp;&nbsp;Select All Stop 1s&nbsp;&nbsp;
                                        </a>
                                    </td>                                                                                                                        
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td nowrap="yes">
                        <table id="buttonID0" border="1" cellspacing="0" cellpadding="0" class="buttonBorder">
                            <tbody>
                                <tr>
                                    <td id="buttonRegular" nowrap="yes" class="buttonText">
                                        <a href="javascript: onSelectMatchingStops('2');" 
                                        tabindex="39" 
                                        onmouseover="i2uiSetMenuCoords (this,event)">&nbsp;&nbsp;Select All Stop 2s&nbsp;&nbsp;
                                        </a>
                                    </td>                                                                                                                        
                                </tr>
                            </tbody>
                        </table>
                    </td>

                    <script>
                        function onSelectMatchingStops(vals) {
                                jQuery('td[title="Stop Number"]').each((index, stop) => {
                                jQuery('input[name="RowKey"]',stop.parentElement).prop("checked", stop.innerHTML === vals);                                                                     
                                });                                                                                                                                                                                                  
                        }
                    </script>

                </tr>
            </tbody>
        </table>
  
    `);
};