/*
 * Auto-formats any input nodes with datatype: ssn
 */

$( document ).on( 'daPageLoad', function (){

  let inputs = document.querySelectorAll( "input.da-ssn" );
  let ssnPattern = "999-99-9999";

  for ( let input of inputs ) {
    keepInputFormatted( input, ssnPattern );
  }

});
