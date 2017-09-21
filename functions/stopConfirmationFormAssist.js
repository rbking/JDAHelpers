/**
 * Copies the Load ID as Master BOL
 * @param {*} frm 
 * @param {*} inputs 
 */
function stopConfirmationFormAssist(frm, inputs) {
    console.log ("I'm here!");
    frm['mbol'].value = jQuery(jQuery('.containerBody td')[1]).html();
}