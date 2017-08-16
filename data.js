var data = [
  {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
  {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
  {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
  {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
];

var produce = {name: 'Banana', produceCode: 'FG3X-Q52A-HN4D-6Y7N', unitPrice: '0.5051'}

var getList = function() {
  return data;
}

var getExampleProduce = function() {
  return produce;
}

module.exports = {
  getList: getList,
  getExampleProduce: getExampleProduce
}