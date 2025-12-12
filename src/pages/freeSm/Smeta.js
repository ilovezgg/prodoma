import React from 'react'
import z from './Smeta.module.css'
const Smeta = () => {
  return (
    <div className={z.main}>
      <div className={z.title}>
        Строим дома под ключ: 3 принципа, которые экономят ваши деньги и нервы
      </div>
      <div className={z.container}>
        <div className={z.first}>

<div className={z.premTitle}>
  Проект, который учитывает каждую вашу <span className={z.accent}>привычку</span>
</div>
          <div className={z.premText}>
            Создаем планировку, где все продумано до мелочей: от утреннего маршрута до вечернего отдыха. Вы получаете дом, который чувствует ваши потребности.
          </div>
        </div>
        <div className={z.second}>
          <div className={z.premTitle}>
  Инженерные системы с <span className={z.accent}>5-летней гарантией</span>
</div>
          <div className={z.premText}>
            Вам не придется разбираться в проводах и трубах. Мы делаем все коммуникации "под ключ" и берем на себя любые проблемы в течение 5 лет.
          </div>
        </div>
        <div className={z.third}>
        <div className={z.premTitle}>
  <span className={z.accent}>Фиксированная смета</span>: никаких сюрпризов
</div>
          <div className={z.premText}>
            Знаете точную стоимость до начала стройки. Цена не меняется в процессе - защищаем ваш бюджет от непредвиденных расходов.
          </div>
        </div>
      </div>
    </div>
  )
}
export default Smeta;