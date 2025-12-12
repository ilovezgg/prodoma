
import React from 'react';
import z from './Catalog.module.css';
import HouseCard from './HouseCard';

const Catalog = () => {
  return (
    <div className={z.main}>
      <div className={z.title}>
         Выберите дом своей мечты
      </div>
      <div className={z.subtitle}>
  Дома, построенные для жизни — не для галочки.
</div>
      <div className={z.container}>
        <div className={z.first}>
          <HouseCard
            images={[require('./pics/1a.webp'),
                require('./pics/1b.webp')
            ]} 
            name="Проект №101"
            price="от 2.5 миллионов руб."
            totalArea="98"
            floors="1"
            bedrooms="1"
          />
        </div>
        <div className={z.second}>
          <HouseCard
            images={[
              require('./pics/2a.webp'),
              require('./pics/2b.webp'),
            ]} 
            name="Проект №102"
            price="от 2.5 миллиона руб."
            totalArea="91"
            floors="1"
            bedrooms="1"
          />
        </div>
      </div>
       <div className={z.container}>
        <div className={z.first}>
          <HouseCard
            images={[require('./pics/3a.webp'),
                require('./pics/3b.webp')
            ]} 
            name="Проект №103"
            price="от 2.4 миллиона руб."
            totalArea="86"
            floors="1"
            bedrooms="1"
          />
        </div>
        <div className={z.second}>
          <HouseCard
            images={[
              require('./pics/4a.webp'),
              require('./pics/4b.webp'),
            ]} 
            name="Проект №104"
            price="от 2.5 миллиона руб."
            totalArea="91"
            floors="1"
            bedrooms="1"
          />
        </div>
      </div>
             <div className={z.container}>
        <div className={z.first}>
          <HouseCard
            images={[require('./pics/5a.webp'),
                require('./pics/5b.webp')
            ]} 
            name="Проект №105"
            price="от 2.4 миллионов руб."
            totalArea="86"
            floors="1"
            bedrooms="1"
          />
        </div>
        <div className={z.second}>
          <HouseCard
            images={[
              require('./pics/6a.webp'),
              require('./pics/6b.webp'),
            ]} 
            name="Проект №106"
            price="от 2.5 миллиона руб."
            totalArea="91"
            floors="1"
            bedrooms="1"
          />
        </div>
      </div>
             <div className={z.container}>
        <div className={z.first}>
          <HouseCard
            images={[require('./pics/7a.webp'),
                require('./pics/7b.webp')
            ]} 
            name="Проект №107"
            price="от 2.4 миллионов руб."
            totalArea="86"
            floors="1"
            bedrooms="1"
          />
        </div>
        <div className={z.second}>
          <HouseCard
            images={[
              require('./pics/8a.webp'),
              require('./pics/8b.webp'),
            ]} 
            name="Проект №108"
            price="от 2.5 миллиона руб."
            totalArea="91"
            floors="1"
            bedrooms="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;