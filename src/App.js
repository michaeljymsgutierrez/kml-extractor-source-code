import React, { useState, useEffect } from "react";
import "./App.css";

const App = (props) => {
  const [coordinates, setCoordinates] = useState([]);
  const [gKey, setGKey] = useState("");

  const getKmlData = (data) => {
    const kml = data.target;
    const reader = new FileReader();
    const updatedCoordinates = [];

    if (kml.files[0]) {
      reader.readAsText(kml.files[0]);
      reader.onload = () => {
        const kmlCoordinates = reader.result.match(
          /(<coordinates).*(coordinates>)/gs
        );

        const trimmedCoords = kmlCoordinates[0]
          .replace(/['<coordinates */> /\n]/gs, "")
          .trim()
          .split(",0");

        trimmedCoords.forEach((coord) => {
          const splitCoord = coord.split(",");
          if (splitCoord[1] && splitCoord[0]) {
            updatedCoordinates.push([splitCoord[1], splitCoord[0]]);
          }
        });

        setCoordinates(updatedCoordinates);
      };
    }
  };

  const verifyCoordinates = () => {
    if (gKey && coordinates.length > 0) {
      const gUrl = `https://maps.googleapis.com/maps/api/staticmap?size=1200x400&key=${gKey}&path=color:red%7C`;

      const formattedCoordinates = coordinates.map((coordinate) => {
        return `${coordinate[0]},${coordinate[1]}`;
      });

      const closingCoordinates = coordinates[0].join();

      const mapUrl = `${gUrl}${formattedCoordinates.join(
        "|"
      )}|${closingCoordinates}`;

      window.open(mapUrl, "_blank");
    } else {
      if (coordinates.length === 0) {
        alert("Please Select KML file...");
      } else if (gKey === null || gKey === "") {
        alert("Please Add Google API Key...");
      } else {
        alert("Unknow error...");
      }
    }
  };

  const addGoogleKey = () => {
    const gKey = prompt("Add Google API Key", "");
    if (gKey) {
      setGKey(gKey);
      window.localStorage.setItem("gKey", gKey);
    }
  };

  useEffect(() => {
    const gKey = window.localStorage.getItem("gKey");
    if (gKey) {
      setGKey(gKey);
    }
  }, []);

  return (
    <div className="App">
      <span id="forkongithub">
        <a href="https://github.com/michaeljymsgutierrez/kml-extractor-source-code">
          Fork me on GitHub
        </a>
      </span>
      <div className="kml-file-picker">
        <input type="file" onChange={(e) => getKmlData(e)} />
      </div>

      <div className="kml-file-picker">
        <button onClick={() => addGoogleKey()}>Add Google API Key</button>
        &nbsp; &nbsp; &nbsp;
        <button onClick={() => verifyCoordinates()}>Verify Coordinates</button>
      </div>

      <div className="kml-file-picker">
        GOOGLE KEY: {gKey ? gKey : " -- NO API KEY -- "}
      </div>

      <div className="coordinates-table">
        <table>
          <thead>
            <tr>
              <th>LATITUDE</th>
              <th>LONGITUDE</th>
            </tr>
          </thead>
          <tbody>
            {coordinates.map((coordinate, key) => {
              return (
                <tr key={key}>
                  <td>{coordinate[0]}</td>
                  <td>{coordinate[1]}</td>
                </tr>
              );
            })}
            {coordinates.length === 0 && (
              <tr>
                <td colSpan="2" className="no-data">
                  NO DATA TO SHOW
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
