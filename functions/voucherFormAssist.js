function voucherFormAssist(frm, user) {
    /*USER AND RDC VARIABLES*/
    let carr, 
        dol, 

        /*MAKE A LIST OF KNOW CARRIES AND THEIR TARRIF CODES*/
        carrTrf = {
            'GPTD': '1917',
            'SCNN': '1945',
            'HUBG': '1994',
            'PTAG': '1938',
            'QPMT': '1939',
            'WSXI': '1955',
            'SUSE': '2007',
            'AISB': '2422',
            'EPES': '1985',
            'SNCK': '1964',
            'FCLC': '1712',
            'CRCR': '1981',
            'FIXR': '1714',
            'CDNK': '1961',
            'ROEV': '1943',
            'USXI': '1950',
            'MLXP': '2001',
            'DART': '1983',
            'HJBT': '1992'
        };

    /*Start the Initialation*/
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
            { name: 'carrCode', value: carr },
            { name: 'tariffNumber', value: carrTrf[carr], colorBg: true },
            { name: 'custCode', value: 'LOW' },
            { name: 'service', value: 'TL_VAN' },
            { name: 'logisticsGroup', value: 'LOW2' },
            { name: 'refNumber', value: formatVoucher() },

            /*ADJUSTMENT SECTION*/
            { name: 'level_options', value: 'OPTION' },
            { name: 'chargeCode', value: 'DETFR', colorBg: true },
            { name: 'reasonCode_options', value: 'INBO_NO_EST', colorBg: true },
            { name: 'chargedAmount', value: dol, colorBg: true },

            /*VOUCHER DETAILS SECTION*/
            { name: 'shipmentType', value: 'NR' },
            { name: 'profitCenter_options', value: '451000', colorBg: true },
            { name: 'voucherType_options', value: 'MFC' },
            { name: 'costCenter_options', value: 'DOMESTIC' },

            /*ORIGIN/DESTINATION SECTION*/
            { name: 'origLocType', value: 'HUB', colorBg: true },
            { name: 'origLocID', value: `L${user.rdc}`, colorBg: true }
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
        let dt = new Date(),
            year = dt.getFullYear(),
            month = addLeadingZeros(dt.getMonth() + 1),
            day = addLeadingZeros(dt.getDate()),
            hour = addLeadingZeros(dt.getHours()),
            min = addLeadingZeros(dt.getMinutes());

        return `${year}${month}${day}${hour}${min}`;

        function addLeadingZeros(data) {
            return `00${data}`.slice(-2);
        }

    }
};
