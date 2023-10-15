// ==UserScript==
// @name         Remove books not owned or wishlisted
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  Adds a button that allows you to remove all books that are not in library or owned from the 2 for 1 sale. Not pretty. Easy to break by audible.
// @author       DavidSchor
// @match        *://www.audible.co.uk/special-promo/2for1/*
// @match        *://www.audible.com/special-promo/2for1/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=audible.co.uk
// @grant        none
// ==/UserScript==

(function () {
    'use strict'

    if (window !== window.parent) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/parent
        // Don't run inside of a frame
        return
    }

    let divButton = document.createElement('div')
    divButton.classList.add('bc-button-text')
    divButton.classList.add('bc-text')
    divButton.classList.add('bc-size-action-small')

    divButton.id = 'not_bc_removeNonWishlist'

    let headline = document.querySelector('#header-widget-heading-text')

    headline.appendChild(divButton);

    let eleA = document.createElement('a')
    eleA.setAttribute('onclick', 'return false;')
    eleA.textContent = 'Remove non wishlisted books'

    divButton.appendChild(eleA)
    divButton.addEventListener('click', () => {
        document.querySelectorAll('.adblAddToWishlistButton:not(.bc-hidden)').forEach(element => {if(element.closest('li').innerHTML.indexOf("Shelf") === -1){
                                                                                      element.closest('li').remove()}}

                                                                                     )})
}())
