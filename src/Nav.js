import HeaderImg2 from "./Img/StockPredictor3.png";
import HeaderImg from "./Img/StockPreditor.png";

export default function Nav(props) {
  return (
    <nav>
      <img className="HeaderImg2" src={HeaderImg2} alt="StockPredictor"></img>
      <img className="HeaderImg" src={HeaderImg} alt="StockPredictor"></img>
      <form
        className="SearchBar"
        onSubmit={(e) => {
          props.submitingComp(e);
        }}
      >
        <input
          className="SearchInput"
          onChange={(e) => props.Autocomp(e.target.value)}
        ></input>
      </form>
    </nav>
  );
}
