from docassemble.base.util import CustomDataType

class SSN(CustomDataType):
    name = 'ssn'
    container_class = 'da-ssn-container'
    input_class = 'da-ssn'
