import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import './field.css';

class Field extends PureComponent {
  constructor(props) {
    super(props);

    this.createFieldSvg = this.createFieldSvg.bind(this);
  }

  componentDidMount() {
    this.createFieldSvg();
  }

  componentDidUpdate() {
    this.createFieldSvg();
  }

  createFieldSvg() {
    const CELL_SIZE = 25;
    const BORDER_WIDTH = 2;
    const decoratedData = this.props.stateGrid.map((row, y) =>
      row.map((state, x) => ({
        state,
        x,
        y,
        selected: x === this.props.selectedX && y === this.props.selectedY,
      }))
    );

    const row = select(this.svgEl)
      .selectAll('.field-row')
      .data(decoratedData)
      .enter()
      .append('g')
      .attr('class', 'field-row')
      .attr(
        'transform',
        (d, i) => `translate(${BORDER_WIDTH}, ${i * CELL_SIZE + BORDER_WIDTH})`
      );

    // cell
    const cell = row
      .selectAll('.field-cell')
      .data(d => d)
      .enter()
      .append('g')
      .attr('class', 'field-cell')
      .attr(
        'transform',
        (d, i) => `translate(${i * CELL_SIZE + BORDER_WIDTH}, 0)`
      );

    cell.exit().remove();

    const bounds = cell.selectAll('.cell-bounds').data(d => [d]);

    bounds
      .enter()
      .append('rect')
      .style('stroke-width', BORDER_WIDTH)
      .attr('x', (d, i) => i * CELL_SIZE)
      .attr('y', 0)
      .attr('height', CELL_SIZE)
      .attr('width', CELL_SIZE)
      .on('click', d => {
        console.log('ctodo((((d))))', d); // eslint-disable-line no-console
      })
      .on('mouseover', this.props.setKeyTarget)
      .merge(bounds)
      .attr('class', ({ selected }) => {
        console.log('ctodo((((selected))))', selected); // eslint-disable-line no-console
        return selected ? 'cell-bounds cell-bounds--selected' : 'cell-bounds';
      });

    bounds.exit().remove();

    const crosses = cell
      .selectAll('.cell-x')
      .data(d => [d])
      .enter()
      .filter(d => d.state === 'x');

    crosses
      .append('line')
      .attr('class', 'cell-x')
      .attr('x1', 5)
      .attr('y1', 5)
      .attr('x2', CELL_SIZE - 5)
      .attr('y2', CELL_SIZE - 5);

    crosses
      .append('line')
      .attr('class', 'cell-x')
      .attr('x1', 5)
      .attr('y1', CELL_SIZE - 5)
      .attr('x2', CELL_SIZE - 5)
      .attr('y2', 5);

    const filled = cell
      .selectAll('.cell-filled')
      .data(d => [d])
      .enter()
      .filter(d => d.state === 'o');

    filled
      .append('rect')
      .attr('class', 'cell-filled')
      .attr('x', BORDER_WIDTH / 2)
      .attr('y', BORDER_WIDTH / 2)
      .attr('width', CELL_SIZE)
      .attr('height', CELL_SIZE);
  }

  render() {
    return (
      <svg
        ref={el => {
          this.svgEl = el;
        }}
        width={800}
        height={800}
      />
    );
  }
}

Field.propTypes = {
  stateGrid: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOf(['', 'o', 'x']))
  ).isRequired,
  setKeyTarget: PropTypes.func.isRequired,
  selectedX: PropTypes.number.isRequired,
  selectedY: PropTypes.number.isRequired,
};

export default Field;
