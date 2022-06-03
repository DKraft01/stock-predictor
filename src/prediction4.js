export default function Prediction4(props) {
  let n = 4;
  let arrayCut = props.arrData;

  let array;
  if (arrayCut) {
    array = arrayCut.slice(2);
  }

  let prediction;
  let sumYi = 0;
  let sumXiYi = 0;
  let m;
  let b;
  let p = 3;
  let pp = 14;
  let sump = 6;

  if (array) {
    //console.log(array);
    for (let i = 0; i < array.length; i++) {
      sumYi += parseFloat(array[i]);
    }
    //console.log(sumYi);

    for (let i = 0; i < array.length; i++) {
      sumXiYi += parseFloat(array[i] * (i + 1));
    }
    // console.log(sumXiYi);

    m = (p * sumXiYi - sump * sumYi) / (p * pp - sump * sump);
    b = (sumYi * pp - sump * sumXiYi) / (p * pp - sump * sump);
    prediction = m * n + b;

    //console.log(prediction);
  }

  return (
    <button className="predictButton" onClick={() => props.mailman(prediction)}>
      Minimos Cuadrados
    </button>
  );
}
