// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import s from './Input.css';

type FieldPropsType = {
  type: 'text' | 'textarea' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url',
  id: string,
  className?: ?string,
  label: string,
  value: ?string,
  error?: ?string
}

class Field extends Component {
  props: FieldPropsType;

  static defaultProps: {
    type: 'text',
    className: null,
    value: '',
    error: null
  };

  state: {
    value: string,
    hasFocus: bool
  };

  constructor(props: FieldPropsType) {
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
    const { type, id, className, label, ...props } = this.props;
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
      <div className={cx(s.field, className, stateClasses)}>
        <label htmlFor={id}>{label}</label>
        {
          type !== 'textarea'
            ? <input type={type} value={value} {...inputAttr} {...props} />
            : <textarea {...inputAttr} {...props} value={value} />
        }
      </div>
    );
  }
}

export default Field;
