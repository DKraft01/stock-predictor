export default function Prediction3(props) {
  let n = 6;
  let array = props.arrData;

  let prediction;
  let sumYi = 0;
  let sumXiYi = 0;
  let m;
  let b;
  let p = 5;
  let pp = 55;
  let sump = 15;

  if (array) {
    //console.log(array);
    for (let i = 0; i < array.length; i++) {
      sumYi += parseFloat(array[i]);
    }
    // console.log(sumYi);

    for (let i = 0; i < array.length; i++) {
      sumXiYi += parseFloat(array[i] * (i + 1));
    }
    // console.log(sumXiYi);

    m = (p * sumXiYi - sump * sumYi) / (p * pp - sump * sump);
    b = (sumYi * pp - sump * sumXiYi) / (p * pp - sump * sump);
    prediction = m * n + b;
  }

  return (
    <button className="predictButton" onClick={() => props.mailman(prediction)}>
      Least Square
    </button>
  );
}
