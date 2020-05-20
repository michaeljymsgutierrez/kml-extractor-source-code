import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kmlContent: null,
      coordinates: [],
      gKey: null
    };
  }

  componentDidMount() {
    const gKey = window.localStorage.getItem("gKey");

    if (gKey) {
      this.setState({ gKey });
    }
  }

  getKmlData(data) {
    const kml = data.target;
    const reader = new FileReader();
    const updatedCoordinates = [];

    if (kml.files[0]) {
      reader.readAsText(kml.files[0]);
      reader.onload = () => {
        this.setState({ kmlContent: reader.result });

        const coordinates = this.state.kmlContent.match(
          /(<coordinates).*(coordinates>)/gs
        );
        const trimmedCoords = coordinates[0]
          .replace(/['<coordinates */> /\n]/gs, "")
          .trim()
          .split(",0");

        trimmedCoords.forEach(coord => {
          const splitCoord = coord.split(",");
          if (splitCoord[1] && splitCoord[0]) {
            updatedCoordinates.push([splitCoord[1], splitCoord[0]]);
          }
        });

        this.setState({ coordinates: updatedCoordinates });
      };
    }
  }

  addGoogleKey() {
    const gKey = prompt("Add Google API Key", "");
    if (gKey) {
      this.setState({ gKey });
      window.localStorage.setItem("gKey", gKey);
    }
  }

  verifyCoordinates() {
    const gUrl =
      "https://maps.googleapis.com/maps/api/staticmap?size=1200x400&key=AIzaSyAkCJqZc45u1VDLCK1Wb9BaD7IwuLc3Als&path=color:red%7C";

    const formattedCoordinates = this.state.coordinates.map(coordinate => {
      return `${coordinate[0]},${coordinate[1]}`;
    });

    const closingCoordinates = this.state.coordinates[0].join();

    const mapUrl = `${gUrl}
    ${formattedCoordinates.join("|")}|${closingCoordinates}`;

    window.open(mapUrl, "_blank");
  }

  render() {
    return (
      <div className="App">
        <div className="kml-file-picker">
          <input type="file" onChange={e => this.getKmlData(e)} />
        </div>
        <div className="kml-file-picker">
          <button onClick={() => this.addGoogleKey()}>
            Add Google API Key
          </button>
          &nbsp;
          <button onClick={() => this.verifyCoordinates()}>
            Verify Coordinates
          </button>
          <br />
          <br />
          GOOGLE KEY: {this.state.gKey}
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
              {this.state.coordinates.map((coordinate, key) => {
                return (
                  <tr key={key}>
                    <td>{coordinate[0]}</td>
                    <td>{coordinate[1]}</td>
                  </tr>
                );
              })}
              {this.state.coordinates.length === 0 && (
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
  }
}

export default App;
