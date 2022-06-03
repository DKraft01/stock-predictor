export default function Prediction2(props) {
  let n = 4;
  let arrayCut = props.arrData;
  //let arrayCut = [4, 8, 12, 16, 20];
  let array;
  if (arrayCut) {
    array = arrayCut.slice(2);
  }
  let arr2 = [];
  let arr3 = [];

  let prediction;
  if (array) {
    // console.log(array);
    for (let i = 1; i < array.length; i++) {
      arr2.push(
        parseFloat(((array[i] - array[i - 1]) / (i - (i - 1))).toFixed(5))
      );
    }
    // console.log(arr2);

    for (let i = 1; i < arr2.length; i++) {
      arr3.push(parseFloat(((arr2[i] - arr2[i - 1]) / (i + 2 - i)).toFixed(5)));
    }

    prediction =
      parseFloat(array[0]) +
      parseFloat(arr2[0] * (n - 1)) +
      parseFloat(arr3[0] * (n - 1) * (n - 2));
    // console.log(prediction);

    return (
      <button
        className="predictButton"
        onClick={() => props.mailman(prediction)}
      >
        Diferencias divididas
      </button>
    );
  }
}
