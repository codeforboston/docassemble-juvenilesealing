// Connects input classes with their formatting event listeners.

$( document ).on( 'daPageLoad', function (){
  /**
   * Auto-formats any input nodes with datatype: ssn (social security number)
   */
  let inputs = document.querySelectorAll( "input.da-ssn" );
  let ssnPattern = "123-45-6789";

  for ( let input of inputs ) {
    keepInputFormatted( input, ssnPattern );
  }

});  // ends ssn pattern


$( document ).on( 'daPageLoad', function (){
  /**
   * Auto-formats any input nodes with datatype: zipcode
   */
  let inputs = document.querySelectorAll( "input.da-zipcode" );
  let zipPattern = "12345";

  for ( let input of inputs ) {
    keepInputFormatted( input, zipPattern );
  }

});  // ends zipcode pattern


$( document ).on( 'daPageLoad', function (){
  /**
   * Auto-formats any input nodes with datatype: dob (date of birth)
   */
  let inputs = document.querySelectorAll( "input.da-dob" );
  let dobPattern = "12/34/5678";

  for ( let input of inputs ) {
    keepInputFormatted( input, dobPattern );
    console.log(daValidationHandler);
    $(input).validate({
      'submitHandler': daValidationHandler,
      'rules': {
        '_attachment_email_address': {
          'minlength': 1,
          'required': true,
          'email': true
        }
      },
      'messages': {
        '_attachment_email_address': {
          'required': "\"" + "An e-mail address is required." + "\"",
          'email': "\"" + "You need to enter a complete e-mail address." + "\""
        }
      },
      'errorClass': 'da-has-error'
    })
  }

});  // ends dob pattern
