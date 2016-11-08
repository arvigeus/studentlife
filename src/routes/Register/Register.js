import React from 'react';
import Relay from 'react-relay';
import cx from 'classnames';
import Picture from '../../components/Picture';
import Form from '../../components/Input/Form';
import Field from '../../components/Input/Field';
import DateTime from '../../components/Input/DateTime';
import Checkbox from '../../components/Input/Checkbox';
import RadioGroup from '../../components/Input/RadioGroup';
import RadioOption from '../../components/Input/RadioOption';
import Dropdown from '../../components/Input/Dropdown';
import s from '../../styles/Profile.css';

type CityType = {
  id: string,
  name: string
}

type UniversityType = {
  id: string,
  name: string,
  city: CityType
}

type RegisterPropsType = {
  cities: Array<CityType>,
  universities: Array<UniversityType>
}

function Register({ profile }) {
  const { cities, universities } = profile;
  const citiesData = {};
  const universitiesData = {};

  for (const { id, name } of cities) citiesData[name] = id;
  for (const { id, name, city } of universities) {
    if (!universitiesData[city.name]) universitiesData[city.name] = {};
    universitiesData[city.name][name] = id;
  }

  return (
    <article>
      <Form action="/api/users/add" method="post" className={cx(s.form, 'row')}>
        <div className="col-md-2">
          <div>
            <div className={s['paperclip-top']} />
            <div className={s['paperclip-bottom']} />
            <Picture
              link={"#"}
              type="portrait"
              title="Избери снимка"
              rotate="-4deg"
              src={{ original: '/images/user.png' }}
              style={{ width: '150px', margin: '-25px 0 20px -15px' }}
            />
          </div>
        </div>
        <div className={cx('col-md-10', 'row')} style={{ marginLeft: '5px' }}>
          <h2 className="col-md-7">Формуляр за регистрация</h2>
          <a href="#" className="button social facebook col-md-5">Запиши се чрез Facebook</a>
          <input type="hidden" name="facebook" />
          <Field
            type="text"
            id="first-name"
            className="col-md-6"
            name="first-name"
            label="Първо име"
            autoComplete="given-name"
            required
          />
          <Field
            type="text"
            id="last-name"
            className="col-md-6"
            name="last-name"
            label="Фамилия"
            autoComplete="family-name"
            required
          />
          <Field
            type="email"
            id="email"
            className="col-xs-12"
            name="email"
            label="Поща"
            autoComplete="email"
            required
          />
          <Field
            type="password"
            id="password1"
            className="col-md-6"
            name="password1"
            label="Парола"
            autoComplete="new-password"
            required
          />
          <Field
            type="password"
            id="password2"
            className="col-md-6"
            name="password2"
            label="Повтори паролата"
            required
          />
          <DateTime
            id="birth-date"
            className="col-md-6"
            name="birth-date"
            label="Дата на раждане"
            required
          />
          <RadioGroup name="gender" className={cx(s.inline, 'col-md-6')} label="Пол">
            <RadioOption id="gender-male" key="male" label="Мъж" name="gender" />
            <RadioOption id="gender-female" key="female" label="Жена" name="gender" />
          </RadioGroup>
          <Dropdown
            id="university"
            className="col-100"
            name="university"
            label="Университет"
            data={universitiesData}
          />
          <Field
            type="number"
            id="university-start"
            className="col-xs-12"
            name="university-start"
            min="1904"
            max="2016"
            value="2016"
            label="Година на постъпване"
          />
          <Dropdown
            id="city"
            className="col-xs-12"
            name="city"
            label="Роден град"
            data={citiesData}
          />
          <Field
            type="tel"
            id="phone"
            className="col-md-6"
            name="phone"
            label="Телефон"
            autoComplete="tel"
          />
          <Field
            type="text"
            id="skype"
            className="col-md-6"
            name="skype"
            label="Skype"
          />
          <Field
            type="textarea"
            id="about"
            className="col-xs-12"
            name="about"
            label="Допълнителна информация"
            rows="5"
          />
          <Checkbox
            id="newsletter"
            name="newsletter"
            label="Искам да получавам информация за интересни предстоящи събития"
            className="col-xs-12"
          />
          <hr className="col-xs-12" />
          <Checkbox id="legal" name="legal" className="col-md-6">
            Приемам <a href="#" rel="noopener noreferrer" target="_blank">условията</a> за
            ползване на сайта
          </Checkbox>
          <div className="col-md-6">Не съм робот</div>
          <hr className="col-xs-12" />
        </div>
      </Form>
    </article>
  );
}

export default Relay.createContainer(Register, {
  fragments: {
    profile: () => Relay.QL`
      fragment on ProfileView {
        cities {
          id,
          name
        },
        universities {
          id,
          name,
          city { name }
        }
      }`
  }
});
