// @flow

import React from 'react';
import cx from 'classnames';
import s from './Input.css';

type CheckboxPropsType = {
  id: string,
  className?: string,
  children: any,
  label?: string,
  value: string
}

export default function Checkbox({ id, className, label, children, ...props }: CheckboxPropsType) {
  return (
    <div className={cx(s.checkbox, className)}>
      <input type="checkbox" id={id} {...props} />
      <label htmlFor={id}>{label || children}</label>
    </div>
  );
}
