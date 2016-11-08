// @flow

import React, { Component } from 'react';

class Form extends Component {
  props: any;

  render() {
    const { children, ...props } = this.props;
    return <form {...props}>{children}</form>
  }
}

export default Form;
