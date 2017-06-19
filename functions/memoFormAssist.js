/**
 * Inputs a default messeage in Trailer Memo
 * if no information exists
 * @param {*} frm 
 * @param {*} inputs 
 */
function memoFormAssist(frm, inputs) {
	let msg 	= 'Inbound PO Trailer Detention',
		npText 	= jQuery('textarea[name="nonPrintableText"]'),
		prText 	= jQuery('textarea[name="printableText"]');

	if (npText.length > 0) {
		/** If the text boxes are empty then insert default message */
		if (!npText.val()) { npText.text(msg); }
		if (!prText.val()) { prText.text(npText.text()); }
	}
};