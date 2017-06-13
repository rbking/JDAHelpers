// ==UserScript==
// @name         JDAHelpers
// @namespace    https://github.com/rbking/JDAHelpers.git
// @version      1.0
// @description  Functions to streamline JDA inputs
// @author       Robert King
// @match        https://timssrvprod.myloweslife.com/tm/entry/*
// @grant        none
// @require      https://cdn.rawgit.com/rbking/JDAHelpers/650b658f/jdaHelper.min.js
// ==/UserScript==

let JDAhelpers = window.JDAhelpers;

/*
** Change the Settings below to your own Information
*/
JDAhelpers.setUser({
    'rdc': 123, 
    'initials': 'ABC'
});

/*
** Check forms and run helper functions
*/
JDAhelpers.checkForms();