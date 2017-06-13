// Here You can type your custom JavaScript...
let doc = window.document,
    user = {},
    frms = [
        { 'formObj': doc.ApMiscVoucherForm,     'helperFn': voucherFormAssist },
        { 'formObj': doc.APVoucherListForm,     'helperFn': voucherListAssist },
        { 'formObj': doc.MemoForm,              'helperFn': memoFormAssist },
        { 'formObj': doc.RateCalcMainForm,      'helperFn': rateFormAssist},
        { 'formObj': doc.StopConfirmationForm,  'helperFn': stopConfirmationFormAssist},
        { 'formObj': doc.LoadVehicleInfoForm,   'helperFn': vehicleFormAssist }        
    ],
    JDAhelpers = {
        setUser: (params) => { user = params},
        checkForms: checkForms
    };

    function checkForms() {
        frms.forEach((index, frm) => {
            let form = frms[frm];
            if (typeof form.formObj != 'undefined') form.helperFn(form.formObj, user);
        });
    };

    window.JDAhelpers = JDAhelpers;