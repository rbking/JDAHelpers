/**
 * Selects the checkmark of the most recently
 * updated voucher
 * @param {*} frm 
 * @param {*} inputs 
 */
function voucherListAssist(frm, inputs) {
    let msg = jQuery('#tmMessageLink').text(),
        sPh = 'Voucher',                        
        ePh = ' ';                              

    if (msg.length > 0) {
        let i = (msg.lastIndexOf(sPh) + sPh.length),
            j = msg.lastIndexOf(ePh);
        
        msg = msg.slice(i, j);
        if (msg.length>0) {
            if (!isNaN(msg)) { jQuery(`input[value*=${msg}]`).trigger('click'); }
        }
    }
};
