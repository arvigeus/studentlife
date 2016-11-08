// @flow

import React from 'react';

type RadioOptionPropsType = {
  id: string,
  label: string,
  value: string
}

export default function RadioOption({ id, label, value, ...props }: RadioOptionPropsType) {
  return (
    <span>
      <input type="radio" id={id} value={value} {...props} />
      <label htmlFor={id}>{label}</label>
    </span>
  );
}
