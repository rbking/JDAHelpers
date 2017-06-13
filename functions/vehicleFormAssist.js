function vehicleFormAssist(frm, user) {

    let Trls = [];
    
    frm['trailerNumber'].value = findTrl(`${jQuery(jQuery('.containerBody td')[1]).html()}`);

    function findTrl(PO) {
        for(let i = 0; i<Trls.length; i++) {
            if (Trls[i].BOL ===`${PO}`) return Trls[i].TrailerNum;
        }
    }
}
