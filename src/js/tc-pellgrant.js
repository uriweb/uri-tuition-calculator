/**
 * SCRIPTS
 *
 * @package uri-tuition-calculator 
 */


( function() {
	'use strict';

	window.addEventListener( 'load', function() {
		creditDropdown();
        awardDropdown();
	} );
     

function creditDropdown() {
    const awardOptions = document.getElementById("c-amount");

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
    option.value = i;
    option.text = i;
    awardOptions.add(option);
    }
}

function awardDropdown() {
    const awardOptions = document.getElementById("p-award");

    for (let i = 370; i <= 3697; i++) {
        const option = document.createElement("option");
    option.value = i;
    option.text = i;
    awardOptions.add(option);
    }
}

}() );