//Función que recibe todos los vinos y devuelve un arreglo con los valores
//únicos de lo que deseamos filtrar en las columnas de la tabla
export const uniqueArrayData = (array, fieldToFilter) => {
  const setValues = new Set(array.map(ele => ele[fieldToFilter]))
  return Array.from(setValues)
}
