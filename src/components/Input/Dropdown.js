// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import s from './Input.css';

type DropdownPropsType = {
  id: string,
  className?: ?string,
  label: string,
  value?: ?string,
  data: any
}

class Dropdown extends Component {
  props: DropdownPropsType;

  static defaultProps: {
    className: null,
    value: null,
    data: {}
  };

  state: {
    value: ?string
  };

  constructor(props: DropdownPropsType) {
    super(props);
    this.state = {
      value: props.value || null
    };
  }

  generateOptions(data: any) {
    const options = [];
    Object.keys(data).forEach((label) => {
      const id = data[label];
      if (id.constructor !== {}.constructor) { // not an object
        options.push(<option key={id} value={id}>{label}</option>);
      } else {
        const optgroup = [];
        Object.keys(id).forEach((opt) => {
          optgroup.push(<option key={id[opt]} value={id[opt]}>{opt}</option>);
        });
        options.push(<optgroup key={label} label={label}>{optgroup}</optgroup>);
      }
    });
    return options;
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { id, className, label, data, ...props } = this.props;
    const stateClasses = {};
    stateClasses[s['has-value']] = !!this.state.value;

    return (
      <div className={cx(s.select, className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        <select id={id} {...props} onChange={this.handleChange.bind(this)}>
          <option value={null} />
          {this.generateOptions(data)}
        </select>
      </div>
    );
  }
}

export default Dropdown;
