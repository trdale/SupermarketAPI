Testing strategy was to first create a very basic API shell, then to begin testing that API. After the API was tested, functionality and acceptence criteria was created in a Test Driven Development.

| Test Group | Acceptance Test | Type of Test | PreConditions | Actions | Assertion |
| --- | --- | --- | --- | --- | --- |
| Data Model | ProduceList is array | Unit | None | Array.isArray(produceList) | Array.isArray(produceList) === true |
| Data Model | Produce list items are objects | Unit | Produce List with items in it | typeof produce | typeof produce === 'object' |
| apiFunctions - listToUpperCase() | converts produceList names to uppercase | Unit | Produce list has data with lower case names | listToUpperCase(ProduceList) | ProduceList.names all uppercase |
| apiFunctions - produceCodeFormatCheck() | returns true if a valid code is provided | Unit | produce object has valid produceCode | produceCodeFormatCheck(produceCode) | produceCodeFormatCheck(produceCode) returns true |
| apiFunctions - produceCodeFormatCheck() | returns false with invalid characters in produceCode | Unit | Produce object has a produceCode with invalid characters | produceCodeFormatCheck(produceCode) | produceCodeFormatCheck(produceCode) returns false |
| apiFunctions - produceCodeFormatCheck() | returns false with invalid character length in produceCode | Unit | Produce object has a produceCode with incorrect char length | produceCodeFormatCheck(produceCode) | produceCodeFormatCheck(produceCode) returns false |
| apiFunctions - checkRequired | checks an object to return true if prop exsists | Unit | object has required prop | checkRequired(obj, prop) | checkRequired(obj, prop) returns true |
| apiFunctions - checkRequired | checks an object to return false if prop does not exsist | Unit | object has does not have required prop | checkRequired(obj, prop) | checkRequired(obj, prop) returns false |
| apiFunctions - getProduce() | returns a list of produce saved in memory | Unit | None | getProduce() | getProduce returns produceList |
| apiFunctions - addProduce() | adds produce providede to produceList | Unit | produceList and a produce object | addProduce(list, produce) | produceList equals list with new produce |
| apiFunctions - deleteProdce() | removes produce object based on name provided from middle of list | Unit | produceList and a produce object contained in list | deleteProduce(list, produce) | produceList equals no longer has produce |
| apiFunctions - deleteProdce() | removes produce object based on name provided from start of list | Unit | produceList and a produce object contained in list | deleteProduce(list, produce) | produceList equals no longer has produce |
| apiFunctions - deleteProdce() | removes produce object based on name provided from end of list | Unit | produceList and a produce object contained in list | deleteProduce(list, produce) | produceList equals no longer has produce |
| apiFunctions - deleteProdce() | returns an error if provided name is not in list | Unit | produceList and a produce object not contained in list | deleteProduce(list, produce) | err returned equals 'Error: Name not found, unable to delete' |
| apiFunctions - validateProduceName() | if produce object has required name prop returns true | Unit | produce object with name prop  | validateProduceName(list, produce) | validateProduceName(list, produce) returns true |
| apiFunctions - validateProduceName() | if produce object does not have required name prop returns false | Unit | produce object without name prop  | validateProduceName(list, produce) | validateProduceName(list, produce) returns error |
| apiFunctions - validateProduceName() | if produce object property name is only alphanumerics and spaces returns true | Unit | produce object with valid prop  | validateProduceName(list, produce) | validateProduceName(list, produce) returns true |
| apiFunctions - validateProduceName() | if produce object property has name unique to data set returns true | Unit | produce object with unique name  | validateProduceName(list, produce) | validateProduceName(list, produce) returns true |
| apiFunctions - validateProduceName() | if produce object property does not have unique name prop in data set returns false | Unit | produce object without unique name  | validateProduceName(list, produce) | validateProduceName(list, produce) returns false |
| apiFunctions - validateProduceCode() | if produce object has required name produceCode returns true | Unit | produce object with produceCode property | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns true |
| apiFunctions - validateProduceCode() | if produce object property produceCode is only alphanumerics and '-' returns true | Unit | produce object with valid produceCode property characters | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns true |
| apiFunctions - validateProduceCode() | if produce object property produceCode is not only alphanumerics and '-' returns false | Unit | produce object with invalid produceCode property characters | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns error |
| apiFunctions - validateProduceCode() | if produce object property produceCode is 16 chars in sets of 4 seperate by - returns true | Unit | produce object with valid produceCode property | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns true |
| apiFunctions - validateProduceCode() | if produce object property produceCode is not 16 chars in sets of 4 seperate by - returns error | Unit | produce object with invalid produceCode property | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns error |
| apiFunctions - validateProduceCode() | if produce object property produceCode unique to data set returns true | Unit | produce object with unique valid produceCode property | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns true |
| apiFunctions - validateProduceCode() | if produce object property produceCode is not unique to data set returns error | Unit | produce object with non-unique valid produceCode property | validateProduceCode(list, produce) | validateProduceCode(list, produce) returns error |
| apiFunctions - validateUnitPrice() | returns true if valid produce has property unitPrice | Unit | valid produce object with property unitPrice | validateUnitPrice(list, produce) | validateUnitPrice(list, produce) returns true |
| apiFunctions - validateUnitPrice() | returns error if otherwise valid produce does not have property unitPrice | Unit | valid produce object without property unitPrice | validateUnitPrice(list, produce) | validateUnitPrice(list, produce) returns error |
| apiFunctions - validateUnitPrice() | returns true if otherwise valid produce property unitPrice is a number | Unit | valid produce object with property unitPrice that is a number | validateUnitPrice(list, produce) | validateUnitPrice(list, produce) returns true |
| apiFunctions - validateUnitPrice() | returns false if otherwise valid produce property unitPrice is not a number | Unit | valid produce object with property unitPrice thats not a number | validateUnitPrice(list, produce) | validateUnitPrice(list, produce) returns false |
| apiFunctions - validateUnitPrice() | valid produce object converts unitPrice to two decimal digit number | Unit | valid produce object | validateUnitPrice(list, produce) | validateUnitPrice(list, produce) returns value rounded to two decimal places |
| apiFunctions - validateProduce() | valid produce object returns true on validation | Unit | valid produce object | validateProduce(list, produce) | validateProduce(list, produce) returns true |
| apiFunctions - validateProduce() | otherwise valid produce object with invalid name property returns error | Unit | valid produce object | validateProduce(list, produce) | validateProduce(list, produce) returns error |
| apiFunctions - validateProduce() | otherwise valid produce object with invalid produceCode property returns error | Unit | valid produce object | validateProduce(list, produce) | validateProduce(list, produce) returns error |
| apiFunctions - validateProduce() | otherwise valid produce object with invalid unitPrice property returns error | Unit | valid produce object | validateProduce(list, produce) | validateProduce(list, produce) returns error |
| API Tests - '/' | GET request returns status 200 | API | None | GET request to '/' | response.statusCode === 200 |
| API Tests - '/' | POST request returns status 404 | API | None | POST request to '/' | response.statusCode === 404 |
| API Tests - '/' | DELETE request returns status 404 | API | None | DELETE request to '/' | response.statusCode === 404 |
| API Tests - '/' | PUT request returns status 404 | API | None | PUT request to '/' | response.statusCode === 404 |
| API Tests - '/api/produce' | GET request returns status 200 without query params| API | None | GET request to '/api/produce' | response.statusCode === 200 |
| API Tests - '/api/produce' | GET request returns produce list | API | None | GET request to '/api/produce' | produceList is returned |
| API Tests - '/api/produce' | GET request returns status 200 with query param upperCase=true | API | None | GET request to '/api/produce?upperCase=true' | response.statusCode === 200 |
| API Tests - '/api/produce' | GET request returns produceList with upper case names | API | None | GET request to '/api/produce?upperCase=true' | produceList.names are all upper case |
| API Tests - '/api/produce' | POST request returns status 200 with payload of valid produce | API | None | POST request to '/api/produce' | response.statusCode === 200 |
| API Tests - '/api/produce' | POST request returns produceList with added whem when payload of valid produce is provided | API | None | POST request to '/api/produce' | produceList has exsisting and new  |
| API Tests - '/api/produce' | POST request returns status 500 with invalid produce payload | API | None | POST request to '/api/produce' | response.statusCode === 500 |
| API Tests - '/api/produce' | DELETE request returns status 404 | API | None | DELETE request to '/api/produce' | response.statusCode === 404 |
| API Tests - '/api/produce' | PUT request returns status 404 | API | None | PUT request to '/api/produce' | response.statusCode === 404 |
| API Tests - '/api/produce/:name' | GET request returns status 404 | API | None | GET request to '/api/produce/:name' | response.statusCode === 404 |
| API Tests - '/api/produce/:name' | POST request returns status 404 | API | None | POST request to '/api/produce/:name' | response.statusCode === 404 |
| API Tests - '/api/produce/:name' | DELETE request returns status 200 when provided name is found in data | API | None | DELETE request to '/api/produce/:name' | response.statusCode === 200 |
| API Tests - '/api/produce/:name' | DELETE request returns list without item of name provided | API | None | DELETE request to '/api/produce/:name' | produceList is returned without item provided |
| API Tests - '/api/produce/:name' | DELETE request returns status 500 when provided name is not found in data  | API | None | DELETE request to '/api/produce/:name' | response.statusCode === 500 |
| API Tests - '/api/produce/:name' | PUT request returns status 404 | API | None | PUT request to '/api/produce/:name' | response.statusCode === 404 |
| Angular - mainController | newProduce is empty object on load | Unit | None | mainController loads | newProduce === {} |
| Angular - mainController | isUpperCase is false on load | Unit | None | mainController loads | isUpperCase === false |
| Angular - mainController | errMsg is null on load | Unit | None | mainController loads | errMsg === null |
| Angular - mainController | getDelRrrMsg is null on load | Unit | None | mainController loads | getDelErrMsg === null |
| Angular - mainController | on init of controller, produceList is set to startingData | Unit | None | mainController init function auto runs on load | produceList === startingData |
| Angular - mainController - getProduce() | when called gets all produce from the server | API | None | getProduce() is called | produceList is returned from server |
| Angular - mainController - getProduce() | when called gets all produce from the server upperCase when isUpperCase is true | API | None | getProduce() is called | produceList is returned from server with all upperCase names |
| Angular - mainController - addProduce() | should add produce and return new list when valid object is passed | API | payload is valid produce | addProduce(newProduce) is called | produceList is returned from server with new produce added |
| Angular - mainController - addProduce() | when given valid produce errMsg is set to null | addProduce(newProduce) is called | errMsg === null |
| Angular - mainController - addProduce() | when given valid produce newProduce is set back to {} | addProduce(newProduce) is called | newProduce === {} |
| Angular - mainController - addProduce() | when given invalid produce newProduce sets errMsg to error | addProduce(newProduce) is called | errMsg === error |
| Angular - mainController - deleteProduce() | when given produce name produceList is returned without named produce | deleteProduce(name) is called | produceList returns without named produce |
| Angular - mainController - deleteProduce() | when given produce invalid name getDelErrMsg is set to error | invalid name is sent as param, deleteProduce(name) is called | getDelErrMsg is set |