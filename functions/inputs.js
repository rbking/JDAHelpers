/**
 * Return a list of approved RDCs
 */
function getRDCList() {
    let rdcs = [955,960,961,962,964,965,966,970,975,989,990,992,
                1413,1419,1420,1421,1424,1425,1426,1427,1429,1430,
                1431,1432,1436,1437,1438,1439,1440,1443,1447,1449,
                1450,1451,1453,1457,1463,1464,1466,1471,1472,1473,
                1477,3106,3110,3111,3112,3257,3258,3262,3264,3266,
                3270,3282,3287,3288,3289,3290,3291,3304,3312,3336,
                3701,3703,998];
    return rdcs;
};

function loadRDC(rdc) {
    /** Set user value */
    inputs.user.rdc = rdc;    
};


function loadInitials(ini) {
    /** Set user value */
    inputs.user.initials = ini;
};


function addUserSettingsModal(input) {
    let user = input.user;
    
    addSettingsModal();
    setRDCRowSource();

    function setRDCRowSource() {
        let sRwSrc = '';
        
        getRDCList().sort((a,b)=>a-b).forEach(rdc => {
            sRwSrc += `<option value = "${rdc}">${rdc}</option>`;
        });
        
        jQuery('#jhsRDC')
            .append(sRwSrc)
            .val(user.rdc);
    };

    function addSettingsModal() {
        /* Add jQuery UI Custom Form Styles */
        jQuery('head').append(`
            <style>
                .ui-form label, .ui-form input { display:block; }
                .ui-form input.text { margin-bottom:12px; width: 90%; padding: .4em; }
                .ui-form select { margin-bottom:12px; width: 95%; padding: .4em; }
                .ui-form fieldset { padding:0; border:0; margin-top:25px; }
                .ui-form .ui-dialog .ui-state-error { padding: .3em; }
                .ui-form .validateTips { border: 1px solid transparent; padding: 0.3em; }
            </style>            
        `);

        /* Add Button and Modal */
        jQuery('body').prepend(`
            <div>
                <button id="openJDAHelpersSettingsModal"
                        class="ui-button ui-widget ui-corner-all"                    
                        style="color:green;float:right">
                            Helper Settings 
                            <img src="https://timssrvprod.myloweslife.com/tmria/images/dcs/settings_normal_16.png" style="vertical-align:middle"></img>
                </button>
            </div>
            
            ${getSettingsHTML()}

            <script>
                (function(window, document, jQuery) {
                    
                    ${getSettingsScript()}

                    ${getSettingsValidation()}

                    function onSubmitSettings(e) {
                        if (validateFields()) {
                            let msg = {
                                rdc: rdc.val(), 
                                ini: ini.val().toUpperCase() 
                            };

                            if (msg && window.CustomEvent) {
                                var event = new CustomEvent('updateJHS', {
                                    detail: {
                                        settings: msg,
                                        time: new Date(),
                                    },
                                    bubbles: true,
                                    cancelable: true
                                });
                            
                                e.currentTarget.dispatchEvent(event);
                                dialog.dialog('close');
                                window.location.reload(false);
                            }
                        }
                    };           

                })(window, document, jQuery);
            </script>
        `);
    }

    function getSettingsHTML() {
        return `
            <div id="jhs-form" class="ui-form" title="JDA Helper Settings">          
                <p class="validateTips ui-state-highlight">All form fields are required.</p>
                <form id="jhsForm">
                    <fieldset>
                        <!-- Choose RDC -->
                        <label for="jhsRDC">Select RDC</label>
                        <select id="jhsRDC" 
                                name="jhsRDC" 
                                class="select ui-widget-content ui-corner-all">
                        </select>
                    
                        <!-- Enter Initials -->
                        <label class="h4">User Initials</label>
                        <input type="text" 
                            id="jhsIni" 
                            name="jhsIni" 
                            value="${user.initials}"
                            class="text ui-widget-content ui-corner-all">                                    

                        <!-- Allow form submission with keyboard without duplicating the dialog button -->
                        <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                    </fieldset>
                </form>
            </div>
        `;
    }

    function getSettingsScript() {
        return `
            let dialog, 
                form,

                rdc = jQuery( '#jhsRDC' ),
                ini = jQuery( '#jhsIni' ),
                allFields = jQuery( [] ).add( rdc ).add( ini ),
                tips = jQuery( '.validateTips' );
        
            jQuery( '#openJDAHelpersSettingsModal' ).button().on('click', function() {
                dialog.dialog( 'open' );
            });         
            
            dialog = jQuery( '#jhs-form' ).dialog({                        
                autoOpen: ("${user.initials}" === '' || ${user.rdc} === 0),
                height: 350,
                width: 250,
                modal: true,
                buttons: {
                    'Change Settings': onSubmitSettings,
                    Close: function() {
                        dialog.dialog( 'close' );                                
                    }
                },
                close: function() {
                    form[0].reset();                        
                }
            });
        
            form = dialog.find( 'form' ).on( 'submit', function( event ) {
                event.preventDefault();
                if (validateFields()) {
                    onSubmitSettings(event);;
                }
            });           
        `;
    }

    function getSettingsValidation() {
        return `
            function validateFields() {
                var valid = true;
                allFields.removeClass( 'ui-state-error' );
            
                valid = valid && checkLength( rdc, 'Please Choose RDC From the List', 3, 4 );
                valid = valid && checkLength( ini, 'Initials must be 3 letters', 3, 3 );
                                
                valid = valid && checkRegexp( rdc, /^[0-9]([0-9])+$/i, 'RDC may only consist of 0-9.' );
                valid = valid && checkRegexp( ini, /^[a-z]([a-z])+$/i, 'Initials may only consist of a-z.' );

                return valid;
            };

            function updateTips( t ) {
                tips
                    .text( t )
                    .addClass( 'ui-state-highlight' );
                setTimeout(function() {
                    tips.removeClass( 'ui-state-highlight', 1500 );
                }, 500 );
            };
        
            function checkLength( o, msg, min, max ) {
                if ( o.val().length > max || o.val().length < min ) {
                    o.addClass( 'ui-state-error' );
                    updateTips( msg );
                    return false;
                } else {
                    return true;
                }
            };
        
            function checkRegexp( o, regexp, n ) {
                if ( !( regexp.test( o.val() ) ) ) {
                    o.addClass( 'ui-state-error' );
                    updateTips( n );
                    return false;
                } else {
                    return true;
                }
            };  
        `;
    }
}