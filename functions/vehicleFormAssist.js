/**
 * Uses JSON input and copies the provied TrailerNum
 * into the trailerNumber field by matching the BOL
 * listed on the page.
 * @param {*} frm 
 * @param {*} inputs 
 */
function vehicleFormAssist(frm, inputs) {
   let trls = inputs.trailers;
   if (trls.length>0) {
        frm['trailerNumber'].value = findTrl(`${jQuery(jQuery('.containerBody td')[1]).html()}`);

        function findTrl(PO) {
            for(let i = 0; i<trls.length; i++) {
                if (trls[i].BOL ===`${PO}`) return trls[i].TrailerNum;
            }
        };
   }
};