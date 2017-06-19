/**
 * Copies the Load ID as Master BOL
 * @param {*} frm 
 * @param {*} inputs 
 */
function stopConfirmationFormAssist(frm, inputs) {
    frm['mbol'].value = jQuery(jQuery('.containerBody td')[1]).html();
}