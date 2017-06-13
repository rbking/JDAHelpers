function voucherListAssist() {
    let msg = jQuery('#tmMessageLink').text(),
        sPh = 'Voucher',
        ePh = ' ',
        chk,
        i = 0,
        j = 0;

    if (msg.length > 0) {
        i = msg.lastIndexOf(sPh) + sPh.length;
        j = msg.lastIndexOf(ePh);
        msg = msg.slice(i, j);
        if (msg.length>0) {
            if (!isNaN(msg)) {
                jQuery(`input[value*=${msg}]`).trigger('click')
            }
        }
    }
};
