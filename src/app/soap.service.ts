
import {Injectable} from '@angular/core';
import * as xml2js from 'xml2js';

@Injectable()
export class SoapService {
    private debug:boolean = false;
    private asynchronous:boolean = true; 
    private localName:boolean = false;
    private servicePort:string = '';
    private servicePath:string = '';  
    private serviceUrl:string = '';

    private nodeTypes : any ;
    private nodeTypeNames: string[] ;
    private targetNamespace:string = '';

    private envelopeBuilder_:(requestBody:string) => string = null;
    private xmlResponseHandler_:(response:NodeListOf<Element>) => void = null;
    private jsoResponseHandler_:(response:{}) => void = null;

    constructor() {
        
        //this.servicePort = servicePort;
        //this.servicePath = servicePath;
        //this.serviceUrl = servicePort + servicePath;

        //if (undefined !== targetNamespace) 
          //  this.targetNamespace = targetNamespace;

        this.nodeTypeNames = [
            undefined,
            "Element",
            "Attribute",
            "Text",
            "CDATA Section",
            "Entity Reference",
            "Entity",
            "Processing Instruction",
            "Comment",
            "Document",
            "Document Type",
            "Document Fragment",
            "Notation"
        ];
         
        enum nodeTypesEnum {
            UNDEFINED = 0,
            ELEMENT = 1,
            ATTRIBUTE = 2,
            TEXT = 3,
            CDATA_SECTION = 4,
            ENTITY_REFERENCE = 5,
            ENTITY = 6,
            PROCESSING_INSTRUCTION = 7,
            COMMENT = 8,
            DOCUMENT = 9,
            DOCUMENT_TYPE = 10,
            DOCUMENT_FRAGMENT = 11,
            NOTATION = 12
        } ;

        this.nodeTypes = nodeTypesEnum ; 

    }

    set envelopeBuilder(envelopeBuilder:(response:{}) => string) {
        this.envelopeBuilder_ = envelopeBuilder;
    }

    set jsoResponseHandler(responseHandler:(response:{}) => void) {
        this.jsoResponseHandler_ = responseHandler;
    }

    private xmlToJson(xml: string): any {
        let result: any = {};
         let doc: any ;
        xml2js.parseString( xml, function (err, result) {
                doc = result ;
                console.log("Resultat parsing "+ doc);
                return doc;
           });
    }

    set xmlResponseHandler(responseHandler:(response:NodeListOf<Element>) => void) {
        this.xmlResponseHandler_ = responseHandler;
    }

    set localNameMode(on:boolean) {
        this.localName = on;
    }

    set debugMode(on:boolean) {
        this.debug = on;
    }

    set testMode(on:boolean) {
        this.debug = on;
        this.asynchronous = !on;
    }

    public setServicePort(servicePort:string){ this.servicePort = servicePort ; }

    public setServiceUrl(serviceUrl:string){ this.serviceUrl = serviceUrl ;}

    public setServicePath(servicePath:string){ this.servicePath = servicePath ; }

    public setTargetNamespace(targetNamespace:string){ this.targetNamespace = targetNamespace ;}   

    public post(method:string, parameters:any, responseRoot?:string):Promise<{}> {
        var request:string = this.toXml(parameters);
        var envelopedRequest:string = null != this.envelopeBuilder_ ? this.envelopeBuilder_(request) : request;
        if (this.debug) {
            console.log('target namespace: ' + this.targetNamespace);
            console.log('method: ' + method);
            console.log('service URL: ' + this.serviceUrl);
            console.log('request: ' + request);
            console.log('envelopedRequest: ' + envelopedRequest);
            console.log((this.asynchronous ? 'asynchronous' : 'synchronous') + ' ' + (this.localName ? 'without namespaces' : 'with namespaces (if returned by the webservice)'));
        }

        var xmlHttp:XMLHttpRequest = new XMLHttpRequest();
        
        return new Promise( (resolve, reject) => {
            xmlHttp.onreadystatechange = () => {
                if (4 == xmlHttp.readyState) {

                    var responseNodeList: NodeListOf<Element>;
                    if (undefined === responseRoot) {
                        console.log('ResponseRoot is undefined !');
                        console.log('ResponseRoot  : '+responseRoot);
                    }
                    else {
                        responseNodeList = xmlHttp.responseXML.getElementsByTagNameNS('*', responseRoot);
                    }
                    if (null != this.xmlResponseHandler_) {
                        this.xmlResponseHandler_(responseNodeList);
                    }
                    
                    if (null != this.jsoResponseHandler_) {
                        console.log("We'll process JSON ...") ;
                        var response:{} = this.convert( responseNodeList[0] , this.localName) ;
                        this.jsoResponseHandler_(response) ;
                        console.log("Resolving :"+response) ;
                        resolve(response) ;
                    }
                }
            };

            xmlHttp.open("POST", this.serviceUrl, this.asynchronous);

            xmlHttp.setRequestHeader("SOAPAction", this.targetNamespace + '/' + encodeURIComponent(method));
            xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");

            xmlHttp.send(envelopedRequest);
        }) ;
    }

    private toXml(parameters:any):string {
        var xml:string = "";
        var parameter:any;

        switch (typeof(parameters)) {
            case "string":
                xml += parameters.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                break;

            case "number":
            case "boolean":
                xml += parameters.toString();
                break;

            case "object":
                if (parameters.constructor.toString().indexOf("function Date()") > -1) {
                    let year:string = parameters.getFullYear().toString();
                    let month:string = ("0" + (parameters.getMonth() + 1).toString()).slice(-2);
                    let date:string = ("0" + parameters.getDate().toString()).slice(-2);
                    let hours:string = ("0" + parameters.getHours().toString()).slice(-2);
                    let minutes:string = ("0" + parameters.getMinutes().toString()).slice(-2);
                    let seconds:string = ("0" + parameters.getSeconds().toString()).slice(-2);
                    let milliseconds:string = parameters.getMilliseconds().toString();

                    let tzOffsetMinutes:number = Math.abs(parameters.getTimezoneOffset());
                    let tzOffsetHours:number = 0;

                    while (tzOffsetMinutes >= 60) {
                        tzOffsetHours++;
                        tzOffsetMinutes -= 60;
                    }

                    let tzMinutes:string = ("0" + tzOffsetMinutes.toString()).slice(-2);
                    let tzHours:string = ("0" + tzOffsetHours.toString()).slice(-2);

                    let timezone:string = ((parameters.getTimezoneOffset() < 0) ? "-" : "+") + tzHours + ":" + tzMinutes;

                    xml += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
                }
                else if (parameters.constructor.toString().indexOf("function Array()") > -1) { // Array
                    for (parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            if (!isNaN(parameter)) {  // linear array
                                (/function\s+(\w*)\s*\(/ig).exec(parameters[parameter].constructor.toString());

                                var type = RegExp.$1;

                                switch (type) {
                                    case "":
                                        type = typeof(parameters[parameter]);
                                        break;
                                    case "String":
                                        type = "string";
                                        break;
                                    case "Number":
                                        type = "int";
                                        break;
                                    case "Boolean":
                                        type = "bool";
                                        break;
                                    case "Date":
                                        type = "DateTime";
                                        break;
                                }
                                xml += this.toElement(type, parameters[parameter]);
                            }
                            else { // associative array
                                xml += this.toElement(parameter, parameters[parameter]);
                            }
                        }
                    }
                }
                else { // Object or custom function
                    for (parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            xml += this.toElement(parameter, parameters[parameter]);
                        }
                    }
                }
                break;

            default:
                throw new Error("SoapService error: type '" + typeof(parameters) + "' is not supported");
        }

        return xml;
    }

    private toElement(tagNamePotentiallyWithAttributes:string, parameters:any):string {
        var elementContent:string = this.toXml(parameters);

        if ("" == elementContent) {
            return "<" + tagNamePotentiallyWithAttributes + "/>";
        }
        else {
            return "<" + tagNamePotentiallyWithAttributes + ">" + elementContent + "</" + SoapService.stripTagAttributes(tagNamePotentiallyWithAttributes) + ">";
        }
    }

    private static stripTagAttributes(tagNamePotentiallyWithAttributes:string):string {
        tagNamePotentiallyWithAttributes = tagNamePotentiallyWithAttributes + ' ';

        return tagNamePotentiallyWithAttributes.slice(0, tagNamePotentiallyWithAttributes.indexOf(' '));
    }


    private convert(xmlRoot, localName) {
        if (undefined !== localName)
            this.localName = localName;
        var jsoRoot = {};
        this.convertNodes(jsoRoot, xmlRoot);
        return jsoRoot;
    }

    private  convertNodes(jso, node) {
        var nodeType = node.nodeType;
        var nodeName = this.localName ? node.localName : node.nodeName;
        if (this.nodeTypes.ELEMENT === nodeType) {
            var jsoNode = {};
            var attributeNodes = node.attributes;
            var attributeIndex : number ;
            attributeIndex = attributeNodes.length;
            if (0 < attributeIndex) {
                var attributes = {};
                for (var attributeIndex = 0; attributeNodes.length > attributeIndex; ++attributeIndex) {
                    var attribute = attributeNodes.item(attributeIndex);
                    attributes[this.localName ? attribute.localName : attribute.nodeName] = attribute.value;
                }
                jsoNode['_'] = attributes;
            }
            var childNodes = node.childNodes;
            for (var childIndex = 0; childNodes.length > childIndex; ++childIndex) {
                this.convertNodes(jsoNode, childNodes[childIndex]);
            }
            if (undefined === jso[nodeName]) {
                jso[nodeName] = jsoNode;
            }
            else {
                if (Array !== jso[nodeName].constructor) {
                    var jsoFirstNode = jso[nodeName];
                    jso[nodeName] = [];
                    jso[nodeName].push(jsoFirstNode);
                }
                jso[nodeName].push(jsoNode);
            }
        }
        else if (this.nodeTypes.TEXT === nodeType) {
            var nodeValue = node.nodeValue;
            if (/\S/.test(nodeValue)) {
                jso['$'] = nodeValue.trim();
            }
        }
    }

}
