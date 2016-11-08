// @flow

import React from 'react';

type ButtonPropsType = {
  submit?: bool,
  children?: any
};

export default function Button({ submit, children, ...props }: ButtonPropsType) {
  return !children
    ? <input type={submit ? 'submit' : 'button'} {...props} />
    : <button {...props}>{children}</button>;
}
