import React from 'react'
import z from './Main.module.css'
import iconWood from './pics/Проверить ящики by iconSvg.co.svg'
const Main = () => {
  return (
    <div className={z.main}>
      <div className={z.pics}>
      <div className={z.picOne}>

      </div>
      <div className={z.picTwo}>

      </div>
      </div>
       <div className={z.title}>
        <div className={z.titleText}>
      Строим дома <span className={z.order}>для жизни</span> по <span className={z.order}>любым</span> проектам
        </div>
        <div className={z.subTitle}>
          <div className={z.element}>
<div className={z.iconWood}>
 <img src={iconWood} alt="Дерево" className={z.woodSvg} />
        </div>
        <div className={z.textSubTitle}>
        Поможем выбрать проект или построим по вашему
        </div>
          </div>

        <div className={z.element}>
<div className={z.iconWood}>
 <img src={iconWood} alt="Дерево" className={z.woodSvg} />
        </div>
        <div className={z.textSubTitle}>
Работаем без предоплаты
        </div>
          </div>
        <div className={z.element}>
<div className={z.iconWood}>
 <img src={iconWood} alt="Дерево" className={z.woodSvg} />
        </div>
        <div className={z.textSubTitle}>
      Дарим смету при заключении договора
        </div>
          </div>
        </div>
        <div className={z.buttons}>
        <div className={z.podr}>
         Подробнее
        </div>
        <div className={z.getProjects}>
         Перейти к проектам
        </div>
        </div>
       </div>
    </div>
  )
}

export default Main