const uniqueArrayData = require('./uniqueArrayData')

const data = [
  {
    alcoholicStrength: 13.5,
    author: '6191ad430bebee0bd38f42d5',
    bottleCapacity: 750,
    brand: 'Montes',
    classification: 'Gran Reserva',
    origin: 'Valle de Santa Rita',
    price: 7490.91,
    rating: 2,
    type: 'Espumante',
    variety: 'Pinot Meunier',
    year: 2019,
    __v: 0,
    _id: '61944762e9b8bc9939047b8a'
  },
  {
    alcoholicStrength: 14.5,
    author: '6191ad430bebee0bd38f42d5',
    bottleCapacity: 750,
    brand: 'Perez Cruz',
    classification: 'Single Block',
    origin: 'Valle del Maipo',
    price: 25000,
    rating: 4,
    type: 'Tinto',
    variety: 'Gewürztraminer',
    year: 2018,
    __v: 0,
    _id: '61944fa4e9b8bc9939047bab'
  },
  {
    alcoholicStrength: 14.5,
    author: '6191ad430bebee0bd38f42d5',
    bottleCapacity: 750,
    brand: 'Perez Cruz',
    classification: 'Gran Reserva',
    imageUrl:
      'https://s3-sa-east-1.amazonaws.com/buze-backoffice-product-images/5f69955c-e2b1-4745-a994-319305ab1628-lg.jpg',
    origin: 'Valle del Maipu Andes',
    price: 7990,
    rating: 4,
    type: 'Tinto',
    variety: 'Cabernet Sauvignon',
    year: 2019,
    __v: 0,
    _id: '6194860b214047e93befc668'
  }
]

test("Devuelve un arreglo con valores únicos, prueba 'brand'", () => {
  expect(uniqueArrayData(data, 'brand')).toEqual(['Montes', 'Perez Cruz'])
})
test("Devuelve un arreglo con valores únicos, prueba 'type'", () => {
  expect(uniqueArrayData(data, 'type')).toEqual(['Espumante', 'Tinto'])
})
test("Devuelve un arreglo con valores únicos, prueba 'bottleCapacity'", () => {
  expect(uniqueArrayData(data, 'bottleCapacity')).toEqual([750])
})
