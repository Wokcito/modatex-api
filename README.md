# MODATEX API

API made with `Express` that increment the number of `filters` and `ordering methods` for [Modatex's](https://www.modatex.com.ar) API, obtaining relevant information about stores and products

> **NOTE**  
> This is a personal project carried out merely for educational purposes

## Table of Contents

- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Endpoints](#endpoints)
  - [Stores](#stores)

## Installation

Clone the repository and install the dependencies

```
npm install
pnpm install
```

## Environment variables

Create a new .env file in the project root and add the next variables

```
MEDIA_SERVER="https://netivooregon.s3.amazonaws.com/"
MT3="https://www.modatex.com.ar/modatexrosa3/"
ACCEPTED_ORIGIN="https://facebook.com"
```

## Endpoints

### Stores

`GET` `/stores/{Section}`

#### Parameters:

- Section[¹](#cites): `'woman'` | `'man'` | `'kids'` | `'xl'` | `'accessories'`

#### Query:

- ranks[¹](#cites) [²](#cites): `'premium'` | `'black'` | `'platinum'` | `'gold'` | `'blue'`
- name: `string`
- minSales: `number`
- minSalesPercent: `number`
- minReputation: `number`
- maxMinimum: `number`
- minMinimum: `number`
- flashDiscount: `1 = true` _(boolean)_
- start: `number`
- length: `number`
- order: `'asc'` | `'desc'`
- fieldOrder: `'reputation'` | `'minimum'` | `'name'` | `'sales'` | `'sales_percent'`

##### Cites

> 1. required
> 2. you can pass several of them separated by commas

Example

```js
const SECTION = 'woman'
const RANKS = 'premium,black,platinum,gold,blue'
const NAME = 'holic'

fetch(`http://localhost:3000/stores/${SECTION}?ranks=${RANKS}&name=${NAME}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
```

Response
```json
{
  "recordsFiltered": 1,
  "data": [
    {
      "store_id": 1354,
      "name": "holic",
      "reputation": 85,
      "completed_sales": 445,
      "completed_sales_percent": 72,
      "attempted_sales": 613,
      "background": "https://netivooregon.s3.amazonaws.com/common/img/cover/holic_1693247988_woman_black.webp",
      "logo": "https://netivooregon.s3.amazonaws.com/common/img/logo/holic_1547479126.webp",
      "minimum": 25000,
      "flash_discount": false,
      "leader": false,
      "slides": []
    }
  ]
}
```
