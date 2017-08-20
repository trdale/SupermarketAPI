# DELETE /api/produce/:name

DELETE request to /api/produce/:name

## Description

Given a valid name paramter, will delete produce with provided name from produce list saved by the server. Returns modified list, or error if name is not found.

## Paramters

* name - the name of the produce you would like to delete (case insensitive)

## Return Format

An array with removed produce with the following keys and values: 
  * name - Name of the produce
  * produceCode - Code for the produce 
  * unitPrice - The unit price of the produce

## Errors

All errors return with status 500 with response data holding a error message string describing the err in provided payload. 

* Error: Name not found, unable to delete

## Example

**Preexsisting data set**

```
  [
    {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
    {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
    {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
    {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
  ]

```

**Request**

```sh
$ curl -X "DELETE" http://localhost:3000/api/produce/lettuce
```

**Return**

```

  [
    {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
    {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
    {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
  ]

```
