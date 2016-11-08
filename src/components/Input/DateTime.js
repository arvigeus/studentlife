// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import s from './Input.css';

type DateTimePropsType = {
  id: string,
  className?: ?string,
  label: string,
  value: ?string,
  error?: ?string
}

// TODO: Implement this properly
class DateTime extends Component {
  props: DateTimePropsType;

  static defaultProps: {
    className: null,
    value: '',
    error: null
  };

  state: {
    value: string,
    hasFocus: bool
  };

  constructor(props: DateTimePropsType) {
    super(props);
    this.state = {
      value: props.value || '',
      hasFocus: false
    };
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleFocus(hasFocus: bool) {
    this.setState({ hasFocus });
  }

  render() {
    const { id, className, label, ...props } = this.props;
    const { value, hasFocus } = this.state;

    const stateClasses = {};
    stateClasses[s['has-value']] = !!value;
    stateClasses[s['has-focus']] = hasFocus;

    const inputAttr = {
      id,
      name: id,
      onChange: this.handleChange.bind(this),
      onFocus: this.handleFocus.bind(this, true),
      onBlur: this.handleFocus.bind(this, false)
    };

    return (
      <div className={cx(s.datetime, className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        <input type="date" value={this.state.value} {...inputAttr} {...props} />
      </div>
    );
  }
}

export default DateTime;
