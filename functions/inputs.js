/**
 * Inports Trailers JSON object 
 * @param {*} jsonObj 
 */
function setTrailers(jsonObj) {
    inputs.trailers = jsonObj;
};


/**
 * Validates user input against a list of known locations
 * @param {*} rdc 
 */
function validateRDC(rdc) {
    let rdcs = [955,960,961,962,964,965,966,970,975,989,990,992,
                1413,1419,1420,1421,1424,1425,1426,1427,1429,1430,
                1431,1432,1436,1437,1438,1439,1440,1443,1447,1449,
                1450,1451,1453,1457,1463,1464,1466,1471,1472,1473,
                1477,3106,3110,3111,3112,3257,3258,3262,3264,3266,
                3270,3282,3287,3288,3289,3290,3291,3304,3312,3336,
                3701,3703];

    /** Continue loop until match or cancel button is pressed */
    while (rdcs.indexOf(rdc) === -1) {
        rdc = parseInt(prompt('Enter your RDC'));
        if(isNaN(rdc)) { return {status: false}; }
    }

    /** Set user value and return valid staus */
    inputs.user.rdc = rdc;    
    return { status: true, value: rdc };
};

/**
 * Validates user input is 3 characters long
 * @param {*} ini 
 */
function validateInitials(ini) {
    while(ini.length !== 3 ) {
        ini = prompt('Enter your 3 initials').toUpperCase();
        if(ini === null) { return { status: false }; }
    }
    /** Set user value and return valid staus */
    inputs.user.initials = ini;
    return { status: true, value: ini };
};