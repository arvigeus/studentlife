// @flow

import React from 'react';
import RadioOption from './RadioOption';
import cx from 'classnames';
import s from './Input.css';

type RadioGroupPropsType = {
  name: string,
  value: string,
  className?: ?string,
  children: any,
  label: string,
  error?: ?string
}

export default function RadioGroup({ name, value, className, label, children, ...props }: RadioGroupPropsType) { // eslint-disable-line max-len
  return (
    <div className={cx(s.radio, className)} {...props}>
      <div className={s['radio-label']}>{label}</div>
      {children.map(child =>
        (child.type === RadioOption ? React.cloneElement(child, { name, key: value }) : child)
      )}
    </div>
  );
}
