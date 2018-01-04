import React, { PureComponent } from 'react';
import './App.css';
import Field from './containers/field';

const travelGrid = (x, y, dX, dY, arr) => {
  if (arr.length < 1) {
    return null;
  }

  const height = arr.length;
  const width = arr[0].length;

  return {
    x: (width + x + dX) % width,
    y: (height + y + dY) % height,
  };
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleKeyInput = this.handleKeyInput.bind(this);
    this.setSelected = this.setSelected.bind(this);

    const junk1 = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'x',
      '',
      '',
      '',
      'x',
      '',
      '',
      '',
    ];
    const junk2 = [
      'x',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'o',
      'o',
      'x',
      'o',
      '',
      '',
    ];
    const rawData = [
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
      junk2,
      junk1,
    ];

    this.state = {
      selectedX: 0,
      selectedY: 0,
      stateGrid: rawData,
    };
  }

  componentDidMount() {
    global.window.addEventListener('keydown', this.handleKeyInput);
  }

  componentWillUnmount() {
    global.window.removeEventListener('keydown', this.handleKeyInput);
  }

  setSelected({ x, y }) {
    const { selectedX, selectedY } = this.state;

    if (selectedX !== x || selectedY !== y) {
      this.setState({ selectedX: x, selectedY: y });
    }
  }

  handleKeyInput(event) {
    const move = (dX, dY) => {
      const { stateGrid, selectedX, selectedY } = this.state;
      this.setSelected(travelGrid(selectedX, selectedY, dX, dY, stateGrid));
    };

    let isHandled = true;
    switch (event.keyCode) {
      case 37: // left arrow
      case 72: // h
        // go left
        move(-1, 0);
        break;
      case 38: // up arrow
      case 75: // k
        // go up
        move(0, -1);
        break;
      case 39: // right arrow
      case 76: // l
        // go right
        move(1, 0);
        break;
      case 40: // down arrow
      case 74: // j
        // go down
        move(0, 1);
        break;
      default:
        isHandled = false;
    }

    if (isHandled) {
      event.preventDefault();
    }
  }

  render() {
    const { selectedX, selectedY, stateGrid } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Picross</h1>
        </header>
        <p className="App-intro">
          <Field
            stateGrid={stateGrid}
            selectedX={selectedX}
            selectedY={selectedY}
            setKeyTarget={this.setSelected}
          />
        </p>
      </div>
    );
  }
}

export default App;
