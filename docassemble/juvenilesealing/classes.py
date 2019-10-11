from docassemble.base.util import CustomDataType

class SSN ( CustomDataType ):
    name = 'ssn'
    container_class = 'da-ssn-container'
    input_class = 'da-ssn'

class Zipcode ( CustomDataType ):
    name = 'zipcode'
    container_class = 'da-zipcode-container'
    input_class = 'da-zipcode'

class DOB ( CustomDataType ):
    name = 'dob'
    container_class = 'da-dob-container'
    input_class = 'da-dob'
    