export function formatPrice(price: number) {


  const convertedNumber = price.toLocaleString('pt-br',
    {
      minimumFractionDigits: 2
    });



  return convertedNumber
}