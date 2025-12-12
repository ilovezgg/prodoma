import React from 'react';
import z from './CallBack.module.css';

const CallBack = () => {
  return (
    <div className={z.main}>
      <div className={z.pic}>
        <div className={z.blackCube}>
          <div className={z.title}>
            Ваш дом — только для вас
          </div>
          <div className={z.subtitle}>
            Расскажите, каким вы его видите — и мы создадим уникальный проект под ваш участок, бюджет и мечты.
          </div>
          <input
            className={z.name}
            type="text"
            placeholder="Ваше имя"
            aria-label="Имя"
          />
          <input
            className={z.number}
            type="tel"
            placeholder="Телефон"
            aria-label="Номер телефона"
          />
          <textarea
            className={z.description}
            placeholder="Что важно в вашем доме? Например: 2 этажа, большая кухня-гостиная, терраса, энергоэффективность..."
            aria-label="Описание желаемого дома"
          />
          <button className={z.submitBtn}>Получить индивидуальный проект</button>
        </div>
      </div>
    </div>
  );
};

export default CallBack;