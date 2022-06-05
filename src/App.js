import "./App.css";
import Plot from "react-plotly.js";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Prediction from "./Prediction";

import datosPrueba from "./Datosprueba";
import SuggestionList from "./SuggestionList";
import Footbar from "./Footbar";
import Prediction3 from "./Prediction3";

import Prediction5 from "./Prediction5";

//API KEY: 2NHOXSDDTYHPW3CT
//API PROFILE KEY: f7f0205eb1f5170e91f7a5b167688128;

function App() {
  //States
  const [StockXValue, setStockXValue] = useState();
  const [StockYValue, setStockYValue] = useState();
  const [Symbol, setSymbol] = useState("");
  const [Profile, setProfile] = useState();
  const [TimeChart, setTimeChart] = useState("TIME_SERIES_DAILY");
  const [TimeChartKey, setTimeChartKey] = useState("Time Series (Daily)");
  const [PredictionYValue, setPredictionYValue] = useState();
  const [PredNumber, setPredNumber] = useState();
  const [Dates, setDates] = useState(new Date());
  const [AutoComp, setAutoComp] = useState("");
  const [Suggestion, setSuggestion] = useState();

  //Iteration
  const TimeChartWeekly = "TIME_SERIES_WEEKLY";
  const TimeChartKeyWeekly = "Weekly Time Series";

  const TimeChartDaily = "TIME_SERIES_DAILY";
  const TimeChartKeyDaily = "Time Series (Daily)";

  const TimeChartMonthly = "TIME_SERIES_MONTHLY";
  const TimeChartKeyMonthly = "Monthly Time Series";

  const tomorrow = new Date();

  useEffect(() => {
    (async () => {
      try {
        const datos = await fetch(
          `https://www.alphavantage.co/query?function=${TimeChart}&symbol=${Symbol}&outputsize=compact&apikey=2NHOXSDDTYHPW3CT`
        );

        let datosJson = await datos.json();

        let StockXValue_ = [];
        let StockYValue_ = [];
        for (let key in datosJson[TimeChartKey]) {
          StockXValue_.push(key);
          StockYValue_.push(datosJson[TimeChartKey][key]["4. close"]);
        }
        setStockXValue(StockXValue_);
        setStockYValue(StockYValue_);
        setPredictionYValue(StockYValue_.slice(0, 5).reverse());
      } catch (e) {
        setStockXValue(["2022-04-12", "2022-04-11"]);
        setStockYValue([190, 168.71]);
      }
    })();

    (async () => {
      try {
        let apikey = "f7f0205eb1f5170e91f7a5b167688128";
        let ProfileURL = `https://financialmodelingprep.com/api/v3/profile/${Symbol}?apikey=${apikey}`;

        const profile = await fetch(ProfileURL);

        let profileJson = await profile.json();
        setProfile(profileJson);
      } catch (e) {
        setProfile(datosPrueba);
      }
    })();
  }, [Symbol, TimeChart, TimeChartKey]);

  useEffect(() => {
    if (AutoComp.length > 1) {
      (async () => {
        try {
          const datosAuto = await fetch(
            `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${AutoComp}&apikey=0QWWXEPLH3PB3OR0`
          );

          let datosAutoJson = await datosAuto.json();

          setSuggestion(datosAutoJson.bestMatches);
        } catch (e) {}
      })();
    }
  }, [AutoComp]);

  const submiting = (e) => {
    e.preventDefault();
    console.log(e);
    setSymbol(e.target[0].value);
    setPredNumber();
    setDates(tomorrow.setDate(tomorrow.getDate() + 1));
    e.target[0].value = "";
  };

  const Weekly = () => {
    setTimeChart(TimeChartWeekly);
    setTimeChartKey(TimeChartKeyWeekly);
    setPredNumber();
    setDates(tomorrow.setDate(tomorrow.getDate() + 7));
  };

  const Daily = () => {
    setTimeChart(TimeChartDaily);
    setTimeChartKey(TimeChartKeyDaily);
    setPredNumber();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDates(tomorrow);
  };

  const Monthly = () => {
    setTimeChart(TimeChartMonthly);
    setTimeChartKey(TimeChartKeyMonthly);
    setPredNumber();

    setDates(tomorrow.setMonth(tomorrow.getMonth() + 1));
  };

  const PredictNumber = (e) => {
    setPredNumber(e.toString());
  };

  const AutoCompFunc = (e) => {
    setAutoComp(e);
  };

  const ClickList = (e) => {
    setSymbol(e);
    setAutoComp("");
  };

  if (StockXValue && StockYValue && Profile && Profile[0] !== undefined) {
    return (
      <>
        <Nav submitingComp={submiting} Autocomp={AutoCompFunc}></Nav>

        <div className="App">
          <div className="Container">
            <img
              className="CompanyPhoto"
              src={Profile[0].image}
              alt={Profile[0].symbol}
            ></img>
            <h4>{Profile[0].symbol}</h4>
            <p>Name: {Profile[0].companyName}</p>
            <p>Country: {Profile[0].country}</p>
            <p>Sector: {Profile[0].sector}</p>
            <p>IPO: {Profile[0].ipoDate}</p>
          </div>
          <hr className="solid"></hr>

          <div className="content">
            {window.innerWidth > 800 ? (
              <div className="chart">
                <Plot
                  data={[
                    {
                      x: StockXValue,
                      y: StockYValue,
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "black" },
                      name: "Data",
                    },

                    {
                      y: [PredNumber, StockYValue[0]],
                      x: [Dates, StockXValue[0]],

                      mode: "lines",
                      name: "Prediction",
                      line: {
                        dash: "dot",
                        width: 4,
                      },
                    },
                  ]}
                  layout={{
                    width: 800,
                    height: 600,
                    title: Symbol,
                  }}
                />
              </div>
            ) : (
              <div className="chart">
                <Plot
                  data={[
                    {
                      x: StockXValue,
                      y: StockYValue,
                      type: "scatter",
                      mode: "lines+markers",
                      marker: { color: "black", size: 0.1 },
                      name: "Data",
                    },

                    {
                      y: [PredNumber, StockYValue[0]],
                      x: [Dates, StockXValue[0]],

                      mode: "lines",
                      name: "Prediction",
                      line: {
                        dash: "dot",
                        width: 4,
                      },
                    },
                  ]}
                  layout={{
                    width: window.innerWidth - 3,
                    height: 260,
                    title: Symbol,
                  }}
                />
              </div>
            )}
            <SuggestionList
              inputlenght={AutoComp}
              sug={Suggestion}
              click={ClickList}
            ></SuggestionList>
            <div className="buttonContainer">
              <Prediction
                mailman={PredictNumber}
                arrData={PredictionYValue}
              ></Prediction>
              <Prediction3
                arrData={PredictionYValue}
                mailman={PredictNumber}
              ></Prediction3>
              <Prediction5
                arrData={PredictionYValue}
                mailman={PredictNumber}
              ></Prediction5>
            </div>
            <div className="compound-container">
              <button className="button-compound" onClick={Daily}>
                Daily
              </button>
              <button className="button-compound" onClick={Weekly}>
                Weekly
              </button>
              <button className="button-compound" onClick={Monthly}>
                Monthly
              </button>
            </div>
          </div>
        </div>
        <div className="foot">
          <Footbar />
        </div>
      </>
    );
  } else {
    return (
      <>
        <Nav submitingComp={submiting} Autocomp={AutoCompFunc}></Nav>
        <h1 className="introMessage">
          <div>Welcome to StockPredictor!</div>
          <div>Please enter the Ticker Symbol in the search bar above</div>
        </h1>
        {/* <input onChange={(e) => setAutoComp(e.target.value)}></input> */}
        <SuggestionList
          inputlenght={AutoComp}
          sug={Suggestion}
          click={ClickList}
        ></SuggestionList>
      </>
    );
  }
}

export default App;
