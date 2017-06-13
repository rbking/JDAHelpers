function memoFormAssist() {
	let msg = 'Inbound PO Trailer Detention';

	if (jQuery('textarea[name="nonPrintableText"]').length > 0) {
		jQuery('textarea[name="nonPrintableText"]').text(msg);
		jQuery('textarea[name="printableText"]').text(msg);
	}
};