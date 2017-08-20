# POST /api/produce

POST request to /api/produce

## Description

Given valid payload object of a new produce, will add the data to the produce list stored in memory.
Will return a new produce list, with all current data including freshly added.
If invalid payload is provided will return error. Data is accepted in x-www-form-urlencoded or JSON.

## Payload

**Required**

* name - name of the produce 
  - Must be a unique non used name (case insensitive)
  - Must contain only alphanumerics and spaces
* produceCode - code for the produce
  - Must be a unique produce code (case insensitive)
  - 16 characters longs with dashes seperate each group of 4 characters (total with dashes 19 characters)
  - Must only contain alphanumerics and dashes ('-')
* unitPrice - unit price of the produce
  - Must be a number (this will be rounded to two decimal places)

**Example**

```
  {name: 'Banana', produceCode: '1234-ABCD-56EF-GH78', unitPrice: '0.50'}

```

## Return Format

An array with added produce with the following keys and values: 
  * name - Name of the produce
  * produceCode - Code for the produce 
  * unitPrice - The unit price of the produce

## Errors

All errors return with status 500 with response data holding a error message string describing the err in provided payload. Only provides one error, first it finds during validation of payload.

* Error: name is not unique, please provide unique name
* Error: name contains invalid characters, alphanumeric only
* Error: name required
* Error: produce code is not unique, please provide unique produce code
* Error: produceCode must be sixteen characters long, with dashes separating each four character group
* Error: produce code contains invalid characters, alphanumeric and dashes only
* Error: produceCode required
* Error: unitPrice is not a number
* Error: unitPrice required

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
$curl -d "name=banana&produceCode=1234-ABCD-56EF-GH78&unitPrice=0.50" -X POST http://localhost:3000/api/produce
```

**Return**

```

  [
    {name: 'Lettuce', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
    {name: 'Peach', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
    {name: 'Green Pepper', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
    {name: 'Gala Apple', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'},
    {name: 'Banana', produceCode: '1234-ABCD-56EF-GH78', unitPrice: '0.50'}
  ]

```
