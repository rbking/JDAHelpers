/**
 * Insert default values into the MFC Voucher Form
 * Currently setup for Trailer Detentions
 * @param {*} frm 
 * @param {*} inputs 
 */
function voucherFormAssist(frm, inputs) {
    /*USER AND RDC VARIABLES*/
    let user = inputs.user,
        carr, 
        dol,
    
    /*MAKE A LIST OF KNOW CARRIERS AND THEIR TARRIF CODES*/
    carrTrf= {
            "AISB": "2422",
            "BNRP": "1959",
            "CDNK": "1961",
            "CCNI": "1676",
            "CRCR": "1981",
            "DART": "1983",
            "DDIV": "1685",
            "EPES": "1985",
            "EPML": "1932",
            "FCLC": "1712",
            "FIXR": "1714",
            "GPTD": "1917",
            "HABC": "1725",
            "HJBT": "1992",
            "HUBG": "1994",
            "MLXP": "2001",
            "PGLI": "1936",
            "PSKL": "2264",
            "PTAG": "1938",
            "QPMT": "1939",
            "ROED": "2284",
            "ROEV": "1943",            
            "SCNN": "1945",
            "SNCK": "1964",
            "SUSE": "2007",
            "USXI": "1950",
            "WENP": "1952",
            "WSXI": "1955",
            "WSXI": "1955",
            "KNIG": "1998",
            "DTNF": "1720",
            "NAFD": "1922",
            "SNCY": "1925",
            "CLXE": "1671"
        },
        
        /*MFC Types*/
        mfcType = [            
            {
                "name": "CNG (Fuel)",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "DFPFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "891305",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },
            {
                "name": "Reconsignment",
                "hide": true,                
                "optValue": [{                    
                    "CC": "RCCFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "891305",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },
            {
                "name": "Redelivery",
                "hide": false,                
                "optValue": [{                    
                    "CC": "DEPFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "862500",    
                    "ST": "L",
                    "OT": "DC"
                }]
            },
            {
                "name": "Trailer Detention (Inbound PO)",
                "hide": true,                
                "optValue": [{                    
                    "CC": "DETFR",
                    "RC": "INBO_NO_EST",
                    "PC": "451000",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },
            {
                "name": "Trailer Detention (DC Pays)",
                "hide": true,                
                "optValue": [{                    
                    "CC": "DETFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "891302",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },            
            {
                "name": "Trailer Rental",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "TRCFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "891305",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },
            {
                "name": "Trailer Repair",
                "hide": true,                
                "optValue": [{
                    "CC": "DCEFR",
                    "RC": "VEH_REPAIRS",
                    "PC": "891750",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            },            
            {
                "name": "Tolls",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "BRDFR",
                    "RC": "OBOUND_NO_ES",
                    "PC": "891305",    
                    "ST": `L${user.rdc}`,
                    "OT": "HUB"
                }]
            }
        ];


    /*Run at the Start*/
    init();

    function init() {
        addModal();     
        setCarrierRowSource();
        setMFCTypeRowSource();

        function setCarrierRowSource() {
            let sRwSrc = '';
            Object.keys(carrTrf).sort().forEach(car => {
                sRwSrc += `<option value = "${carrTrf[car]}">${car.toUpperCase()}</option>`;
            });
            jQuery('#mfcCarrier').append(sRwSrc);
        };

        function setMFCTypeRowSource() {
            let sRwSrc = '';
            mfcType.forEach((type,index) => {                
                let vals = type.optValue[0],
                    /* Generate a JSON Object to be Passed through the OnChange Event */
                    mapper =[
                        {"name" : "mfcChargeCode",      "value": vals.CC    },
                        {"name" : "mfcReasonCode",      "value": vals.RC    },
                        {"name" : "mfcProfitCenter",    "value": vals.PC    },
                        {"name" : "mfcStore",           "value": vals.ST    },
                        {"name" : "mfcOrigLocType",     "value": vals.OT    }
                    ];
                /* Generate the Rowsource for the Option Buttons */
                sRwSrc += `<option data-mfc=${JSON.stringify(mapper)} 
                                   data-hide=${type.hide} 
                                   value="${type.name}">${type.name}
                            </option>`;
            });       

            jQuery('#mfcType')
                .append(sRwSrc)
                .val('Trailer Detention (Inbound PO)')
                .change();
        }
        
    };

    function addModal() {
        /* Add jQuery UI Custom Form Styles */
        jQuery('head').append(`
            <style>
                label, input { display:block; }
                input.text { margin-bottom:12px; width: 90%; padding: .4em; }
                select { margin-bottom:12px; width: 95%; padding: .4em; }
                fieldset { padding:0; border:0; margin-top:25px; }
                .ui-dialog .ui-state-error { padding: .3em; }
            </style>
        `);
        /* Add jQuery UI Custom Modal */
        jQuery('body').prepend(`
            <button id="openModal">Open Modal</button>
            <div id="dialog-form" title="Miscellaneous Freight Charges">          
                <form id="mfcForm">
                    <fieldset>
                        <!-- Choose Carrier -->
                        <label for="mfcCarrier">Select Carrier</label>
                        <select id="mfcCarrier" 
                                name="mfcCarrier" 
                                class="select ui-widget-content ui-corner-all">
                        </select>

                        <!-- Choose MFC Type -->
                        <label for="mfcType">MFC Type</label>
                        <select id="mfcType" 
                                name="mfcType" 
                                onChange="onMFCTypeChange(this.options[this.selectedIndex])"
                                class="text ui-widget-content ui-corner-all">
                        </select>
                        
                        <!-- Enter Charge Amount -->
                        <label class="h4">MFC Charge Amount</label>
                        <span style="float:left;margin-top:6px">$</span>
                        <input type="text" 
                               id="mfcAmount" 
                               name="mfcAmount" 
                               value=50
                               class="text ui-widget-content ui-corner-all">                                    

                        <div class="mfc-ops">
                            <!-- Choose Type of Location to Charge -->
                            <label for="mfcOrigLocType">Location Type</label>
                            <select id="mfcOrigLocType" 
                                    name="mfcOrigLocType"
                                    class="text ui-widget-content ui-corner-all">
                                <option value="HUB">RDC</option>
                                <option value="DC">Store</option>                                    
                            </select>
                            
                            <!-- Enter Store to Charge To -->
                            <label for="mfcStore">Charge Location</label>
                            <input type="text" 
                                   id="mfcStore" 
                                   name="mfcStore" 
                                   value="L${user.rdc}"
                                   class="text ui-widget-content ui-corner-all">
                        </div>

                        <!-- Hidden Fields --> 
                        <div>
                            <input type="hidden" 
                                   id="mfcChargeCode" 
                                   name="mfcChargeCode" 
                                   value="DETFR"/>
                            <input type="hidden" 
                                   id="mfcReasonCode" 
                                   name="mfcReasonCode" 
                                   value="INBO_NO_EST"/>
                            <input type="hidden" 
                                   id="mfcProfitCenter" 
                                   name="mfcProfitCenter" 
                                   value="451000" />                                                                     
                        </div>

                        <!-- Allow form submission with keyboard without duplicating the dialog button -->
                        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                    </fieldset>
                </form>
            </div>
            <script>
                let dialog, 
                    form;   
                
                function onMFCTypeChange(selected) {                
                    let type = selected.dataset;

                    /* Hide Certain Controls if not needed */
                    if(type.hide==='true') { 
                        jQuery('.mfc-ops').addClass("ui-helper-hidden");
                    } else {
                        jQuery('.mfc-ops').removeClass("ui-helper-hidden");
                    };

                    /* Populate Controls with values */
                    JSON.parse(type.mfc).forEach((control) => {
                        jQuery('#'+control.name).val(control.value);
                    })
                };

                jQuery( "#openModal" ).button().on( "click", function() {
                    dialog.dialog( "open" );
                });         
                
                dialog = jQuery( "#dialog-form" ).dialog({
                    autoOpen: true,
                    height: 500,
                    width: 350,
                    modal: true,
                    buttons: {
                        "Fill Out MFC": onSubmitMFC,
                        Close: function() {
                            dialog.dialog( "close" );
                        }
                    },
                    close: function() {
                        form[0].reset();                        
                    }
                });
            
                form = dialog.find( "form" ).on( "submit", function( event ) {
                    event.preventDefault();
                    onSubmitMFC();;
                });           
                
                function onSubmitMFC() {
                   let data = {};
                   // Capture all the data
                   data.mfcCarrierName = jQuery('#mfcCarrier :selected').text();
                   jQuery('#mfcForm :input')
                        .serializeArray()
                        .forEach((input) => {
                            data[input.name] = input.value
                        });
                    fillInDefaults(data);
                };

                function fillInDefaults(data) {
                    /*Set Default Values Based on Inputs*/
                    let mfcDefaultValues = [

                        /*VOUCHER SECTION*/
                        { name: 'carrCode',         value: data.mfcCarrierName                  },
                        { name: 'tariffNumber',     value: data.mfcCarrier,     colorBg: true   },
                        { name: 'custCode',         value: 'LOW'                                },
                        { name: 'service',          value: 'TL_VAN'                             },
                        { name: 'logisticsGroup',   value: 'LOW2'                               },
                        { name: 'refNumber',        value: formatVoucher()                      },

                        /*ADJUSTMENT SECTION*/
                        { name: 'level_options',        value: 'OPTION'                             },
                        { name: 'chargeCode',           value: data.mfcChargeCode,  colorBg: true   },
                        { name: 'reasonCode_options',   value: data.mfcReasonCode,  colorBg: true   },
                        { name: 'chargedAmount',        value: data.mfcAmount,      colorBg: true   },

                        /*VOUCHER DETAILS SECTION*/
                        { name: 'shipmentType',         value: 'NR'                                 },
                        { name: 'profitCenter_options', value: data.mfcProfitCenter, colorBg: true  },
                        { name: 'voucherType_options',  value: 'MFC'                                },
                        { name: 'costCenter_options',   value: 'DOMESTIC'                           },

                        /*ORIGIN/DESTINATION SECTION*/
                        { name: 'origLocType',  value: data.mfcOrigLocType, colorBg: true },
                        { name: 'origLocID',    value: data.mfcStore,       colorBg: true },
                        { name: 'destLocType',  value: 'HUB',               colorBg: true },
                        { name: 'destLocID',    value: "L${user.rdc}",      colorBg: true }  
                    ];

                    /*LOOP THROUGH FIELDS AND ADD VALUES AND COLOR*/
                    mfcDefaultValues.forEach((item, index) => {
                        let frm = document.ApMiscVoucherForm,
                            e   = frm[item.name];
                        e.value = item.value;
                        if (item.colorBg === true) e.style.backgroundColor = 'yellow';
                    });

                    /*FORMAT UNIQUE VOUCHER NAME*/
                    function formatVoucher() {
                        return 'MFC'+modDate()+'${user.initials}';
                    };

                    /*FORMAT DATE INTO YYYYMMDDHHmm*/
                    function modDate() {
                        let dt      = new Date(),
                            year    = dt.getFullYear(),
                            month   = addLeadingZeros(dt.getMonth() + 1),
                            day     = addLeadingZeros(dt.getDate()),
                            hour    = addLeadingZeros(dt.getHours()),
                            min     = addLeadingZeros(dt.getMinutes());

                        return year+month+day+hour+min;

                        function addLeadingZeros(data) {
                            return String('00'+data).slice(-2);
                        };
                    };
                };

            </script>

        `);
    }    
    

};
