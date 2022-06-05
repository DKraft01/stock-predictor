export default function Prediction(props) {
  let n = 6;
  let array = props.arrData;
  let arr2 = [];
  let arr3 = [];
  let arr4 = [];
  let arr5;
  let prediction;
  if (array) {
    //console.log(array);
    for (let i = 1; i < array.length; i++) {
      arr2.push(
        parseFloat(((array[i] - array[i - 1]) / (i - (i - 1))).toFixed(5))
      );
    }
    //console.log(arr2);

    for (let i = 1; i < arr2.length; i++) {
      arr3.push(parseFloat(((arr2[i] - arr2[i - 1]) / (i + 2 - i)).toFixed(5)));
    }
    //console.log(arr3);

    for (let i = 1; i < arr3.length; i++) {
      arr4.push(parseFloat(((arr3[i] - arr3[i - 1]) / (i + 3 - i)).toFixed(5)));
    }

    //console.log(arr4);

    arr5 = parseFloat((arr4[1] - arr4[0]) / (5 - 1)).toFixed(5);

    //console.log(arr5);
    prediction =
      parseFloat(array[0]) +
      parseFloat(arr2[0] * (n - 1)) +
      parseFloat(arr3[0] * (n - 1) * (n - 2)) +
      parseFloat(arr4[0] * (n - 1) * (n - 2) * (n - 3)) +
      parseFloat(arr5 * (n - 1) * (n - 2) * (n - 3) * (n - 4));

    //console.log(prediction);

    return (
      <button
        className="predictButton"
        onClick={() => props.mailman(prediction)}
      >
        Divided differences
      </button>
    );
  }
}
