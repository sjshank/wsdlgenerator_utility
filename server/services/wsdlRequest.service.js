var _wsdlResquestModel = {
    serviceName: '',
    targetNamespace: '',
    requestElements: [],
    responseElements: [],
    requestMessages: [],
    responseMessages: [],
    operations: [],
    soapBinding: [],
    soapAddress:{}
};

var wsdlRequestService = {};

wsdlRequestService.setWsdlRequest = _setWsdlRequest;
wsdlRequestService.getWsdlRequest = _getWsdlRequest;
/*wsdlRequestService.getRequestElements = _getRequestElements;
wsdlRequestService.getResponseElements = _getResponseElements;
wsdlRequestService.getRequestMessages = _getRequestMessages;
wsdlRequestService.getResponseMessages = _getResponseMessages;
wsdlRequestService.getOperations = _getOperations;
wsdlRequestService.getSoapAddress = _getSoapAddress;*/

/*
 * Exporting wsdlRequestService 
 */
module.exports = wsdlRequestService;


function _setWsdlRequest(wsdlRequest){
    if(!wsdlRequest || typeof wsdlRequest === 'undefined'){
        return _wsdlResquestModel;
    }
    _wsdlResquestModel.serviceName = wsdlRequest.serviceName;
    _wsdlResquestModel.targetNamespace = wsdlRequest.targetNamespace;
    _setRequestElements(wsdlRequest);
    _setResponseElements(wsdlRequest);
    _setRequestMessages(wsdlRequest);
    _setResponseMessages(wsdlRequest);
    _setOperations(wsdlRequest);
    _setSoapBinding(wsdlRequest);
    _setSoapAddress(wsdlRequest);
}

function _getWsdlRequest(){
    return _wsdlResquestModel; 
}

function _setRequestElements(wsdlRequest){
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

function _setResponseElements(wsdlRequest){
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

function _setRequestMessages(wsdlRequest){
    var requestArr = [];
    // Create request element tag    
    for (var i = 0; i <= wsdlRequest.requestMessages.length - 1; i++) {
        const requestMsg = wsdlRequest.requestMessages[i],
            requestEle = requestMsg['requestElement'],
            messageName = requestMsg['messageName'],
            reqElementName = requestEle['name']['name'];

        var requestEleName = 'tns:' + requestEle['name']['name'];
        requestArr.push({
            'wsdl:message': {
                '@name': messageName,
                'wsdl:part': {
                    '@element': requestEleName,
                    '@name': 'parameters',
                }
            }
        });
    }
    
    _wsdlResquestModel.requestMessages = requestArr;
};

function _setResponseMessages(wsdlRequest){
    var responseArr = [];
    // Create response message tag    
    for (var i = 0; i <= wsdlRequest.responseMessages.length - 1; i++) {
        const responseMsg = wsdlRequest.responseMessages[i],
            responseEle = responseMsg['responseElement'],
            messageName = responseMsg['messageName'],
            resElementName = responseEle['name']['name'];

        var responseEleName = 'tns:' + responseEle['name']['name'];
        responseArr.push({
            'wsdl:message': {
                '@name': messageName,
                'wsdl:part': {
                    '@element': responseEleName,
                    '@name': 'parameters',
                }
            }
        });
    }
    
    _wsdlResquestModel.responseMessages = responseArr;
};

function _setOperations(wsdlRequest){
    var operationArr = [];
    // Create request element tag    
    for (var i = 0; i <= wsdlRequest.operations.length - 1; i++) {
        const operation = wsdlRequest.operations[i],
            methodName = operation['methodName'],
            reqMessageName = operation['requestMessage']['messageName'],
            resMessageName = operation['responseMessage']['messageName'];

        var inputMsg = 'tns:' + reqMessageName,
            outputMsg = 'tns:' + resMessageName;

        operationArr.push({
            'wsdl:operation': {
                '@name': methodName,
                'wsdl:input': {
                    '@name': inputMsg
                },
                'wsdl:output': {
                    '@name': outputMsg
                }
            }
        });
    }
    
    _wsdlResquestModel.operations = operationArr;
};

function _setSoapBinding(wsdlRequest){
    var soapBindingArr = [];
    for (var i = 0; i <= wsdlRequest.operations.length - 1; i++) {
        const operation = wsdlRequest.operations[i],
              methodName = operation['methodName'];
            
        soapBindingArr.push({
            'wsdl:operation': {
                '@name': methodName,
                'soap:operation': {
                    '@soapAction': wsdlRequest.targetNamespace + "/" + methodName
                },
                'wsdl:input': {
                    'soap:body': {
                        '@use': 'literal'
                    }
                },
                'wsdl:output': {
                    'soap:body': {
                        '@use': 'literal'
                    }
                }
            }
        });
    }
    
    _wsdlResquestModel.soapBinding = soapBindingArr;
};

function _setSoapAddress(wsdlRequest){
     var location = 'http://' + wsdlRequest.soapAddress.address + ':' + wsdlRequest.soapAddress.port
                    + '/' + wsdlRequest.soapAddress.contextRoot + '/' + wsdlRequest.serviceName;
                    
    var soapAddress = {
        'soap:address' : {
            '@location' : location
        }
    };
    
    _wsdlResquestModel.soapAddress = soapAddress;
};