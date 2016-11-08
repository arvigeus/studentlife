import React from 'react';
import { Link } from 'react-router';

import userPic from '../../images/user.png';
import s from './AccessBadge.css';

export default function AccessBadge() {
  return (
    <form className={s.root}>
      <fieldset className={s.info}>
        <legend>Карта за достъп</legend>
        <label>
          Поща: <input type="email" />
        </label>
        <label>
          Парола: <input type="password" />
        </label>
      </fieldset>
      <div className={s.photo}>
        {/* <Link className={s.ingress} to="/register">Регистрирай се!</Link> */}
        <img src={userPic} alt="" />
      </div>
      {/* <input className={s.profile} type="submit" value="Влез" /> */}
    </form>
  );
}
