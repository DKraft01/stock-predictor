export default function Prediction5(props) {
  let n = 6;
  let array = props.arrData;

  let prediction;
  let sumYi = 0;
  let sumXiYi = 0;

  let p = 5;
  let pp = 55;
  let ppp = 225;
  let sump = 15;
  let pppp = 979;
  let sumXi2Yi = 0;

  if (array) {
    for (let i = 0; i < array.length; i++) {
      sumYi += parseFloat(array[i]);
    }

    for (let i = 0; i < array.length; i++) {
      sumXiYi += parseFloat(array[i] * (i + 1));
    }

    for (let i = 0; i < array.length; i++) {
      sumXi2Yi += parseFloat(array[i] * (i + 1) ** 2);
    }

    let A = [
      [p, sump, pp],
      [sump, pp, ppp],
      [pp, ppp, pppp],
    ];

    let V = [sumYi, sumXiYi, sumXi2Yi];

    // let A = [
    //   [4, 10, 38],
    //   [10, 38, 160],
    //   [38, 160, 722],
    // ];

    // let V = [2, 11, 43];

    let r = solve(A, V);

    prediction = r[2] * (n * n) + r[1] * n + r[0];

    function det(A) {
      var result = 0;
      for (var i = 0; i < 3; i++) {
        var v1 = 1;
        var v2 = 1;
        for (var j = 0; j < 3; j++) {
          v1 *= A[j][(i + j) % 3];
          v2 *= A[j][2 - ((i + j) % 3)];
        }

        result += v1 - v2;
      }
      return result;
    }

    function copy(A) {
      //crea un vector _ de 3x1
      var _ = new Array(3);
      //Recorrer cada fila de _
      for (var i = 0; i < 3; i++) {
        _[i] = new Array(3); //Cada fila de _ tiene tres elementos
        for (var j = 0; j < 3; j++) {
          _[i][j] = A[i][j]; //Cada elemento i,j de _ se iguala al valor del elemento i,j de A
        }
      }
      return _;
    }

    function row(A, j, v) {
      var _ = copy(A); //crear copia de A
      for (var i = 0; i < 3; i++) {
        //Se reemplaza el elemento i de cada fila de A, por el elemento i del vector v.
        _[i][j] = v[i];
      }
      return _;
    }

    function solve(mat, val) {
      var detA = det(mat); //determinante de la matriz de coeficientes
      var Aj, detAj;

      var res = new Array(3); //vector de resultados
      for (var i = 0; i < 3; i++) {
        //matriz A en donde la i-ésima columna se ha reemplazado por el vector de valores independientes
        Aj = row(copy(mat), i, val);
        //determinante de Aj
        detAj = det(Aj);
        //Solución i
        res[i] = detAj / detA;
      }

      return res;
    }
  }

  return (
    <button className="predictButton" onClick={() => props.mailman(prediction)}>
      Least Square 2 order
    </button>
  );
}
