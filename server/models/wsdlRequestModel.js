var _wsdlResquestModel = {
    serviceName: '',
    targetNamespace: '',
    requestElements: [],
    responseElements: [],
    requestMessages: [],
    responseMessages: [],
    operations: [],
    soapAddress:{}
};

var wsdlRequestService = {};

wsdlRequestService.setWsdlRequest = _setWsdlRequest;
wsdlRequestService.getWsdlRequest = _getWsdlRequest;
wsdlRequestService.getRequestElements = _getRequestElements;
wsdlRequestService.getResponseElements = _getResponseElements;
wsdlRequestService.getRequestMessages = _getRequestMessages;
wsdlRequestService.getResponseMessages = _getResponseMessages;
wsdlRequestService.getOperations = _getOperations;
wsdlRequestService.getSoapAddress = _getSoapAddress;


var _setWsdlRequest = function(wsdlRequest){
    _wsdlResquestModel.serviceName = wsdlRequest.serviceName;
    _wsdlResquestModel.targetNamespace = wsdlRequest.targetNamespace;
    
}

var _setRequestElements = function(wsdlRequest){
    var requestArr = [];
    // Create request element tag    
    for (var i = 0; i <= wsdlRequest.requestElements.length - 1; i++) {
        const requestEle = wsdlRequest.requestElements[i],
            elements = requestEle['elements'];

        var eleArr = [];
        for (var j = 0; j <= elements.length - 1; j++) {
            const element = elements[j];
            var type = "xsd:" + element['dataType'];
            var input = element['input'];

            eleArr.push({
                    '@name': input,
                    '@type': type
            });
        }
        
        const requestEleName = requestEle.name; 
        requestArr.push({
            'xsd:element': {
                '@name': requestEleName,
                'xsd:complexType': {
                    'xsd:sequence': {
                        'xsd:element': eleArr
                    }
                }
            }
        });
    }
    
    _wsdlResquestModel.requestElements = requestArr;
};

var _setResponseElements = function(wsdlRequest){
    var responseArr = [];
    // Create response element tag
    for (var i = 0; i <= wsdlRequest.responseElements.length - 1; i++) {
        const responseEle = wsdlRequest.responseElements[i],
            elements = responseEle['elements'];

        var eleArr = [];
        for (var j = 0; j <= elements.length - 1; j++) {
            const element = elements[j];
            var type = "xsd:" + element['dataType'];
            var output = element['output'];

            eleArr.push({
                    '@name': output,
                    '@type': type
            });
        }
        
        const responseEleName = responseEle.name; 
        responseArr.push({
            'xsd:element': {
                '@name': responseEleName,
                'xsd:complexType': {
                    'xsd:sequence': {
                         'xsd:element': eleArr
                    }   
                }
            }
        });
    }
    
    _wsdlResquestModel.responseElements = responseArr;
};

var _setRequestMessages = function(wsdlRequest){
    var requestArr = [];
    // Create request element tag    
    for (var i = 0; i <= wsdlRequest.requestMessages.length - 1; i++) {
        const requestMsg = wsdlRequest.requestMessages[i],
            requestEle = requestMsg['requestElement'];

        var eleArr = [];
        for (var j = 0; j <= requestEle.length - 1; j++) {
            const element = requestEle[j];
            var input = element['input'];

            eleArr.push({
                    '@name': input,
                    '@type': type
            });
        }
        
        const requestEleName = requestEle.name; 
        requestArr.push({
            'xsd:element': {
                '@name': requestEleName,
                'xsd:complexType': {
                    'xsd:sequence': {
                        'xsd:element': eleArr
                    }
                }
            }
        });
    }
    
    _wsdlResquestModel.requestElements = requestArr;
};