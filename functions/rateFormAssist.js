/**
 * Fills in the rate form with default values
 * @param {*} frm 
 * @param {*} inputs 
 */
function rateFormAssist(frm, inputs) {

    let user = inputs.user;

    fillInDefaults();

    function fillInDefaults() {
       /*Set Default Values Based on Inputs*/
       let mfcDefaultValues = [

            /*VOUCHER SECTION*/
            { name: 'rateCalculatorMode_options',   value: 'AP_ONLY'        },
            { name: 'ratingUnitsPieces',            value: 1                },
            { name: 'ratingUnitsPallets',           value: 1                },
            { name: 'ratingUnitsWeight',            value: 5000             },
            { name: 'origLocType_options',          value: 'HUB'            },
            { name: 'origLocID',                    value: `L${user.rdc}`   },
            { name: 'destLocType_options',          value: 'DC'             }
        ];

        /*LOOP THROUGH FIELDS AND ADD VALUES AND COLOR*/
        mfcDefaultValues.forEach((item, index) => {
                let e   = frm[item.name];
                e.value = item.value;
                /*if (item.colorBg === true)*/ e.style.backgroundColor = 'yellow';
            });
    }

}