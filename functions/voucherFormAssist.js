/**
 * Insert default values into the MFC Voucher Form
 * Currently setup for Trailer Detentions
 * @param {*} frm 
 * @param {*} inputs 
 */
function voucherFormAssist(frm, inputs) {
    /*USER AND RDC VARIABLES*/
    let user    = inputs.user,
        carrTrf = getCarrierList(),
        mfcType = getMFCTypes(),
        carr, 
        dol;
        
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
                        {"name" : "mfcChargeCode",      "value": vals.CC                    },
                        {"name" : "mfcReasonCode",      "value": vals.RC || "OBOUND_NO_ES"  },
                        {"name" : "mfcProfitCenter",    "value": vals.PC                    },
                        {"name" : "mfcStore",           "value": vals.ST || `L${user.rdc}`  },
                        {"name" : "mfcOrigLocType",     "value": vals.OT || "HUB"           },
                        {"name" : "mfcCommodity",       "value": vals.CM || ""              },
                        {"name" : "mfcdestLocType",     "value": vals.DT || "HUB"           }                        
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
        };
        
    };

    function addModal() {
               
        /* Add jQuery UI Custom Modal */
        jQuery('body').prepend(`
            <button id="openMFCModal">Open Modal</button>
            ${getMFCFormHTML()}
            <script>
                (function(window, document, jQuery) {
                    let dialog, 
                        form; 
            
                    ${getMFCScript()}

                    ${getMFCDefaults()}

                    window.onMFCTypeChange = onMFCTypeChange;

                })(window, document, jQuery);
            </script>
        `);
    };

    /*MAKE A LIST OF KNOW CARRIERS AND THEIR TARRIF CODES*/
    function getCarrierList() {
        return {
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
            "CLXE": "1671",
            "BIOS": "1660",
            "BTIU": "1653",
            "CDAM": "1678",
            "CNBH": "1672",
            "CNPJ": "1689",
            "NFCA": "1777",
            "TNXC": "1842",
            "TNXU": "2286",
            "TPTO": "1845",
            "TPTP": "1846",
            "TRRB": "1847",
            "SNCF": "1806",
            "CHXD": "1963",
            "BNRD (3367)": "3702",
            "BNRD": "1644",
            "CGOR":	"1962",
            "CLLQ":	"1979",
            "GPTC":"1740",
            "GRTG":"1988",
            "HAEI":"1989",
            "HJCS":"2862",
            "HJCS (3270)":"2863",
            "HRTD":"1993",
            "HYWK":"1995",
            "KKWQ":"1746",
            "MTRK":"1765",
            "NAFT":"2006",
            "RBTW":"1941",
            "RGLJ":"1787",
            "SCQA":"1796",
            "XPOL":"1956"



        };
    };

    /*Choose MFC Types*/
    function getMFCTypes() {                
        if(!is998()) {
            return getRDCMFCTypes();
         } else {
            return get998MFCTypes();
         }
    };

    /*RDC MFC List*/
    function getRDCMFCTypes() {
        return [            
            {
                "name": "CNG (Fuel)",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "DEPFR",
                    "PC": "891305"
                }]
            },
            {
                "name": "Reconsignment",
                "hide": true,                
                "optValue": [{                    
                    "CC": "RCCFR",
                    "PC": "891305"
                }]
            },
            {
                "name": "Redelivery",
                "hide": false,                
                "optValue": [{                    
                    "CC": "DEPFR",
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
                    "PC": "451000"
                }]
            },
            {
                "name": "Trailer Detention (DC Pays)",
                "hide": true,                
                "optValue": [{                    
                    "CC": "DETFR",
                    "PC": "891302"
                }]
            },            
            {
                "name": "Trailer Rental",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "TRCFR",
                    "PC": "891305"
                }]
            },
            {
                "name": "Trailer Repair",
                "hide": true,                
                "optValue": [{
                    "CC": "DCEFR",
                    "RC": "VEH_REPAIRS",
                    "PC": "891750"
                }]
            },            
            {
                "name": "Tolls",  
                "hide": true,              
                "optValue": [{                    
                    "CC": "BRDFR",
                    "PC": "891305"
                }]
            }
        ];
    }

    /*998 MFC List*/
    function get998MFCTypes() {
        return [            
            {
                "name": "ADC Deliveries",
                "hide": false,                
                "optValue": [{                    
                    "CC": "DETFR",
                    "RC": "INBO_NO_EST",
                    "PC": "451000",    
                    "ST": "L",
                    "CM": "CLOSED"
                }]
            },
            {
                "name": "ICBs to ADC",
                "hide": false,                
                "optValue": [{                    
                    "CC": "EXMFR",
                    "PC": "862500",    
                    "ST": "L",
                    "OT": "DC"
                }]
            } ,
            {
                "name": "ADC/Store Detention",
                "hide": false,                
                "optValue": [{                    
                    "CC": "DEPFR",
                    "PC": "891302",    
                    "ST": "L",
                    "OT": "DC",
                    "CM": "CLOSED",
                    "DT": "DC"
                }]
            }         
        ];
    }

    /*MFC Form HTML*/
    function getMFCFormHTML() {
        return `
            <div id="mfc-form" class="ui-form" title="Miscellaneous Freight Charges">          
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
                            <input type="hidden" 
                                   id="mfcCommodity" 
                                   name="mfcCommodity" 
                                   value="" />
                            <input type="hidden" 
                                   id="mfcdestLocType" 
                                   name="mfcdestLocType" 
                                   value="" />                                                                                                          
                        </div>

                        <!-- Allow form submission with keyboard without duplicating the dialog button -->
                        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                    </fieldset>
                </form>
            </div>
        `;
    };

    /*Script to Deal with Modal Dialog*/
    function getMFCScript() {
        return `       
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

            jQuery( "#openMFCModal" ).button().on("click", function() {
                dialog.dialog( "open" );
            });         
            
            dialog = jQuery( "#mfc-form" ).dialog({
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
        `;
    };

    /*Script to fill in Default Values into Form */
    function getMFCDefaults() {
        return `
            function fillInDefaults(data) {                
                let destLoc          = ${!is998()} ? 'L${user.rdc}': data.mfcStore,
                    bCCm             = data.mfcCommodity.length !== 0,

                /*Set Default Values Based on Inputs*/
                    mfcDefaultValues = [

                    /*VOUCHER SECTION*/
                    { name: 'carrCode',         value: data.mfcCarrierName.substring(0,4)   },
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
                    { name: 'commodity',            value: data.mfcCommodity,    colorBg: bCCm  },
                    { name: 'profitCenter_options', value: data.mfcProfitCenter, colorBg: true  },
                    { name: 'voucherType_options',  value: 'MFC'                                },
                    { name: 'costCenter_options',   value: 'DOMESTIC'                           },                    

                    /*ORIGIN/DESTINATION SECTION*/
                    { name: 'origLocType',  value: data.mfcOrigLocType, colorBg: true },
                    { name: 'origLocID',    value: data.mfcStore,       colorBg: true },
                    { name: 'destLocType',  value: data.mfcdestLocType, colorBg: true },
                    { name: 'destLocID',    value: destLoc,             colorBg: true }  
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
        `;
    }

    function is998() {
        return  Number(user.rdc) === 998;        
    }
};
