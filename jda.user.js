// ==UserScript==
// @name         JDAHelpers
// @namespace    https://github.com/rbking/JDAHelpers.git
// @version      2.3.4
// @description  Functions to streamline JDA inputs
// @author       Robert King
// @match        https://timssrvprod.myloweslife.com/tm/entry/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.rawgit.com/rbking/JDAHelpers/5dc87bb8/jdaHelper.min.js
// ==/UserScript==

(function(jda) {
    let rdc = GM_getValue('rdc',0),
        ini = GM_getValue('ini','');

    /*
    ** Validate User Information
    */
    rdc = jda.validateRDC(rdc);
    ini = jda.validateInitials(ini);

    if(rdc.status && ini.status) {
        GM_setValue('rdc', rdc.value);
        GM_setValue('ini', ini.value);

    /*
    ** Check forms and run helper functions
    */
        jda.checkForms();
    }
})(JDAhelpers);