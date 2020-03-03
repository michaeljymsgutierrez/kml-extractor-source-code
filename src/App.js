import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kmlContent: null,
      coordinates: [],
    };
  }

  getKmlData(data) {
    const kml = data.target;
    const reader = new FileReader();
    const updatedCoordinates = [];

    if (kml.files[0]) {
      reader.readAsText(kml.files[0]);
      reader.onload = () => {
        this.setState({kmlContent: reader.result});

        const coordinates = this.state.kmlContent.match(
          /(<coordinates).*(coordinates>)/gs,
        );
        const trimmedCoords = coordinates[0]
          .replace(/['<coordinates */> /\n]/gs, '')
          .trim()
          .split(',0');

        trimmedCoords.forEach(coord => {
          const splitCoord = coord.split(',');
          if (splitCoord[1] && splitCoord[0]) {
            updatedCoordinates.push([splitCoord[1], splitCoord[0]]);
          }
        });

        this.setState({coordinates: updatedCoordinates});
      };
    }
  }

  render() {
    return (
      <div className="App">
        <div className="kml-file-picker">
          <input type="file" onChange={e => this.getKmlData(e)} />
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
                  <td colspan="2" className="no-data">NO DATA TO SHOW</td>
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
