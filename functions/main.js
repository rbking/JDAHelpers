/**
 * Main entry point into the JDAHelpers userscript
 */
let doc = window.document,
    
    /**
     * Create Objecect that will expose functions to set
     * variables inside inputs object
     */
    JDAhelpers = {
        checkForms:         checkForms,
        validateRDC:        validateRDC,
        validateInitials:   validateInitials,
        setTrailers:        setTrailers
    },

    /**
     * Inputs keeps information submitted by the User
     * Functions to check user input or in inputs.js
     */
    inputs = {
        user: {},
        trailers: {}
    },

    /**
     * Forms object to map forms to helper functions
     * Each helper function is housed in it's own module 
     */
    frms = [
        { 'formObj': doc.ApMiscVoucherForm,     'helperFn': voucherFormAssist           },
        { 'formObj': doc.APVoucherListForm,     'helperFn': voucherListAssist           },
        { 'formObj': doc.MemoForm,              'helperFn': memoFormAssist              },
        { 'formObj': doc.RateCalcMainForm,      'helperFn': rateFormAssist              },
        { 'formObj': doc.StopConfirmationForm,  'helperFn': stopConfirmationFormAssist  },
        { 'formObj': doc.LoadVehicleInfoForm,   'helperFn': vehicleFormAssist           },
        { 'formObj': doc.LoadList,              'helperFn': loadFormAssist              },
        { 'formObj': doc.LoadListForm,          'helperFn': loadListFormAssist          },
        { 'formObj': doc.StopListForm,          'helperFn': stopFormAssist              }        
    ];

/**
 * Main function to check if a form is loaded on the page
 * and call it's helper functions with passed values
 */
function checkForms() {
    frms.some((index, frm) => {
        let form = frms[frm];
        if (typeof form.formObj != 'undefined') { form.helperFn(form.formObj, inputs); }
    });
};

/**
 * Expose the JDAhelpers object to userscript
 */
window.JDAhelpers = JDAhelpers;

/**
 * ALL OTHER SCRIPTS IN ../functions ARE ATTACHED USING GULP
 */