export default function TotalProduct({ products }) {
  const totalProduct = products.total;
  let textToDisplay = ``;

  if (totalProduct) {
    if (totalProduct > 100) {
      const TotalRoundedToHundred = Math.round(totalProduct / 100) * 100;
      textToDisplay = `+ ${TotalRoundedToHundred} résultats`;
    } else if (totalProduct === 1) {
      textToDisplay = `${totalProduct} résultat`;
    } else {
      textToDisplay = `${totalProduct} résultats`;
    }
  } else {
    textToDisplay = `0 résultat`;
  }

  return (
    <p className="font-semibold font-mcqueen text-darker-grey">
      {textToDisplay}
    </p>
  );
}
