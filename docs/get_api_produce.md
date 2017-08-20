# GET /api/produce

GET request to /api/produce

## Description

Returns a list of produce saved in memory of the server, defaults to 4 pre-saved produce on startup

## Paramaters

* upperCase (optional) - sets if names in produce list are returned upperCase or not. Default *false*.
  - 'true' - Names returned in all uppercase

## Return Format

An array with the following keys and values: 
  * name - Name of the produce
  * produceCode - Code for the produce 
  * unitPrice - The unit price of the produce

## Errors

None

## Example

**Request**

```sh
$ curl http://localhost:3000/api/produce
```

**Return**

```

  [
    {name: 'LETTUCE', produceCode: 'A12T-4GH7-QPL9-3N4M', unitPrice: '3.46'},
    {name: 'PEACH', produceCode: 'E5T6-9UI3-TH15-QR88', unitPrice: '2.99'},
    {name: 'GREEN PEPPER', produceCode: 'YRT6-72AS-K736-L4AR', unitPrice: '0.79'},
    {name: 'GALA APPLE', produceCode: 'TQ4C-VV6T-75ZX-1RMR', unitPrice: '3.59'}
  ]

```
