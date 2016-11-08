import React from 'react';
import s from './PostLetter.css';

export default function() {
  return (
    <form className={s.root}>
      <legend>Свържи се с нас</legend>
      <fieldset>
        <input type="text" name="name" placeholder="Име" />
        <input type="email" name="address" placeholder="Поща" />
        <textarea name="text" rows="3" placeholder="Какво искаш да ни питаш?" />
      </fieldset>
      <address>
        <strong>Телефон:</strong> <a href="callto://+359897625842">+359897625842</a><br />
        <strong>Поща:</strong> <a href="mailto:varna@studentlife.bg">contact@studentlife.bg</a><br />
      </address>
      <div className={s.stamp}>
        <input type="submit" value="Изпрати" />
      </div>
    </form>
  );
}
