const db = require("../config/db"),
	Schema = db.Schema;

var wsdlRequestModel = new Schema({
            serviceName: {type: String},
            targetNamespace: {type: String},
            operations: [],
            soapAddress: {type: Schema.Types.Mixed},
            created_at: {type: String},
            created_by: {type: String}
});

var wsdlModel = db.model('wsdlModels', wsdlRequestModel);

module.exports = wsdlModel;
