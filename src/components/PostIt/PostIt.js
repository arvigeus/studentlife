import React from 'react';
import { Link } from 'react-router';
import s from './PostIt.css';

export default function() {
  return (
    <div className={s.root}>
      <i className={s.pin} />
      <p>
        Запишете се за менторска среща с квалифициран преподавател по EQ, в която ще имате
        възможност да си направите план за личностно развитие. Този план може да развива вашата
        силна област или да се фокусира върху слаба такава, която ви спъва.
      </p>
      <Link to="#">Научи още</Link>
    </div>
  );
}
