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
        carrTrf = {
            "AISB": "2422",
            "BNRP": "1959",
            "CDNK": "1961",
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
            "PTAG": "1938",
            "QPMT": "1939",
            "ROEV": "1943",
            "SCNN": "1945",
            "SNCK": "1964",
            "SUSE": "2007",
            "USXI": "1950",
            "WENP": "1952",
            "WSXI": "1955"
        };

    /*Run at the Start*/
    init();

    function init() {
        /*Gather the Carrier SCAC*/
        carr = prompt('Enter the SCAC');
        if(carr !== null) carr = carr.toUpperCase();

        /*Gather the MFC amount*/
        dol = prompt('Enter the $ amount', 50);

        fillInDefaults();
    };

    function fillInDefaults() {
       /*Set Default Values Based on Inputs*/
       let mfcDefaultValues = [

            /*VOUCHER SECTION*/
            { name: 'carrCode',         value: carr                         },
            { name: 'tariffNumber',     value: carrTrf[carr], colorBg: true },
            { name: 'custCode',         value: 'LOW'                        },
            { name: 'service',          value: 'TL_VAN'                     },
            { name: 'logisticsGroup',   value: 'LOW2'                       },
            { name: 'refNumber',        value: formatVoucher()              },

            /*ADJUSTMENT SECTION*/
            { name: 'level_options',        value: 'OPTION'                       },
            { name: 'chargeCode',           value: 'DETFR',         colorBg: true },
            { name: 'reasonCode_options',   value: 'INBO_NO_EST',   colorBg: true },
            { name: 'chargedAmount',        value: dol,             colorBg: true },

            /*VOUCHER DETAILS SECTION*/
            { name: 'shipmentType',         value: 'NR'                     },
            { name: 'profitCenter_options', value: '451000', colorBg: true  },
            { name: 'voucherType_options',  value: 'MFC'                    },
            { name: 'costCenter_options',   value: 'DOMESTIC'               },

            /*ORIGIN/DESTINATION SECTION*/
            { name: 'origLocType',  value: 'HUB',           colorBg: true },
            { name: 'origLocID',    value: `L${user.rdc}`,  colorBg: true }
        ];


        /*LOOP THROUGH FIELDS AND ADD VALUES AND COLOR*/
        mfcDefaultValues.forEach((item, index) => {
                let e = frm[item.name];
                e.value = item.value;
                if (item.colorBg === true) e.style.backgroundColor = 'yellow';
            });
    }

    /*FORMAT UNIQUE VOUCHER NAME*/
    function formatVoucher() {
        return `MFC${modDate()}${user.initials}`;
    };

    /*FORMAT DATE INTO YYYYMMDDHHmm*/
    function modDate() {
        let dt      = new Date(),
            year    = dt.getFullYear(),
            month   = addLeadingZeros(dt.getMonth() + 1),
            day     = addLeadingZeros(dt.getDate()),
            hour    = addLeadingZeros(dt.getHours()),
            min     = addLeadingZeros(dt.getMinutes());

        return `${year}${month}${day}${hour}${min}`;

        function addLeadingZeros(data) {
            return `00${data}`.slice(-2);
        }

    }
};
