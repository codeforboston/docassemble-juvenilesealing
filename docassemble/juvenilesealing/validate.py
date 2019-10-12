from docassemble.base.util import validation_error

def is_valid_ssn ( inputValue ):
  # I guess we'll include the dashes in the count
  isRightLength = len( inputValue ) == 11
  if ( not isRightLength ):
    validation_error( "Write the Social Security Number like this: XXX-XX-XXXX" )
  
  return isRightLength

def is_valid_zip ( inputValue ):
    isRightLength = len( inputValue ) == 5
    if ( not isRightLength):
      validation_error("Write the zipcode with 5 numbers: XXXXX")
    
    return isRightLength

def is_valid_dob ( inputValue ):
    isRightLength = len( inputValue ) == 10
    if ( not isRightLength):
      validation_error("Write your date of birth like this: XX/XX/XXXX")
    
    return isRightLength
  