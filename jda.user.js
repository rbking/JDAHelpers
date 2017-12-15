// ==UserScript==
// @name         JDAHelpers
// @namespace    https://github.com/rbking/JDAHelpers.git
// @version      2.4.1
// @description  Functions to streamline JDA inputs
// @author       Robert King
// @match        https://timssrvprod.myloweslife.com/tm/entry/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.rawgit.com/rbking/JDAHelpers/86e492dd/jdaHelper.min.js
// ==/UserScript==

(function(jda) {

    /**
     * Load Settings Values
     */
    let rdc = GM_getValue('rdc',0),
        ini = GM_getValue('ini','');

    /**
     * Add Settings Update Event Listener
     */
    document.addEventListener("updateJHS", updateJHSHandler, false);

    function updateJHSHandler(e) {
       let settings = e.detail.settings;
        GM_setValue('rdc', settings.rdc);
        GM_setValue('ini', settings.ini);
    }

    /*
    ** Load User Information to JDA Helpers
    */
    rdc = jda.loadRDC(rdc);
    ini = jda.loadInitials(ini);

    /*
    ** Check forms and run helper functions
    */
    jda.checkForms();
})(JDAhelpers);