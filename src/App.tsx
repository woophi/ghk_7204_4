import { BottomSheet } from '@alfalab/core-components/bottom-sheet/cssm';
import { Button } from '@alfalab/core-components/button/cssm';
import { Collapse } from '@alfalab/core-components/collapse/cssm';
import { Divider } from '@alfalab/core-components/divider/cssm';
import { Gap } from '@alfalab/core-components/gap/cssm';
import { List } from '@alfalab/core-components/list/cssm';
import { PureCell } from '@alfalab/core-components/pure-cell/cssm';
import { SliderInput } from '@alfalab/core-components/slider-input/cssm';
import { Typography } from '@alfalab/core-components/typography/cssm';
import { ArrowRightMIcon } from '@alfalab/icons-glyph/ArrowRightMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { DocumentLinesMIcon } from '@alfalab/icons-glyph/DocumentLinesMIcon';
import { QuestionCircleMIcon } from '@alfalab/icons-glyph/QuestionCircleMIcon';

import { SuperEllipse } from '@alfalab/core-components/icon-view/cssm/super-ellipse';

import { ChangeEvent, Fragment, useEffect, useState } from 'react';

import ban1 from './assets/ban1.png';
import cond1 from './assets/cond1.png';
import cond2 from './assets/cond2.png';
import cond3 from './assets/cond3.png';
import hb from './assets/hb.png';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import reason1 from './assets/reason_1.png';
import reason2 from './assets/reason_2.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

const compareData = [
  {
    l: 'Торговля на свои деньги',
    r: 'Торговля на наши деньги',
  },
  {
    l: 'Рискуете своими 100 000 ₽',
    r: 'Риск ограничен стоимостью участия',
  },
  {
    l: 'Биржевые и брокерские комиссии',
    r: 'Только брокерские комиссии',
  },
  {
    l: 'Можно переносить через ночь',
    r: 'Нельзя переносить через ночь',
  },
];

const forWhom = [
  {
    title: 'Опытным трейдерам',
    subtitle: 'Крупные объёмы торговли без риска личного капитала',
    img: img1,
  },
  {
    title: 'Уверенным новичкам',
    subtitle: 'Проверка себя в профессиональных условиях',
    img: img2,
  },
  {
    title: 'Тем, кто ищет альтернативу',
    subtitle: 'Свобода от давления собственных денег и нестабильности торговли',
    img: img3,
  },
];
const reasons = [
  {
    title: 'Фиксированный риск',
    subtitle: 'За 2 000 ₽ получите в управление брокерский счёт с суммой 100 000 ₽',
    img: reason1,
  },
  {
    title: 'Свободный вывод прибыли',
    subtitle: 'После испытания — счёт на 100 000 ₽ и свободный вывод прибыли',
    img: reason2,
  },
];

const conditions = [
  {
    title: 'Оплачиваете участие',
    subtitle: 'Участие в испытании стоит 2 000 ₽. Вы получаете в управление счёт на 100 000 ₽',
    img: cond1,
  },
  {
    title: 'Торгуете 2 недели',
    subtitle: 'В течение 14 дней нужно показать стабильную торговлю',
    img: cond2,
  },
  {
    title: 'Зарабатываете +2%',
    subtitle: 'Чтобы пройти испытание, необходимо показать +2% прибыли',
    img: cond3,
  },
];

const faqs = [
  {
    question: 'Как и когда я получу выплату?',
    answers: [
      'После успешного прохождения испытания вы переходите на этап фондирования. Прибыль, заработанная на нём, выплачивается по итогам торгового периода.',
      'Вы подаёте запрос на вывод в личном кабинете, и средства поступают на вашу карту или банковский счёт в течение 14 дней. Все условия выплат зафиксированы в договоре-оферте.',
    ],
  },
  {
    question: 'Есть ли скрытые комиссии?',
    answers: [
      'Нет. Вы оплачиваете только стоимость участия в испытании — это фиксированная сумма, указанная в тарифе.',
      'При торговле на счёте взимаются только биржевые комиссии (как при обычной торговле). Брокерская комиссия не взимается. Никаких подписок, ежемесячных платежей или дополнительных сборов.',
    ],
  },
  {
    question: 'Что будет, если я не пройду испытание?',
    answers: [
      'Если баланс вашего счёта снизится на 1% и более от стартового — испытание останавливается. Вы теряете только стоимость участия (от 2 000 ₽), а не весь виртуальный счёт.',
      'Вы можете попробовать снова — оплатив повторный отбор со скидкой.',
    ],
  },
  {
    question: 'Рискую ли я своими деньгами?',
    answers: [
      'Нет. Торговля ведётся на виртуальном счёте с реальными котировками.',
      'Ваш максимальный риск — это стоимость участия в испытании (от 2 000 ₽). Вы не можете потерять больше этой суммы. В отличие от торговли на собственном счёте, где убытки не ограничены.',
    ],
  },
  {
    question: 'Почему нельзя совершать сделки короче 1 минуты?',
    answers: [
      'Это ограничение защищает от манипулятивных стратегий (арбитраж задержек, эксплуатация спредов на новостях), которые не работают в реальной торговле.',
      'Мы оцениваем навык устойчивой прибыльной торговли, а не умение использовать технические уязвимости. Все крупные проп-компании имеют аналогичное ограничение.',
    ],
  },
];

const YOUR_PART = 70;
const SUM_HUNDLE = 100_000;
const MIN = 1;
const MAX = 100;
export const App = () => {
  const [loading, setLoading] = useState(false);
  const [collapsedItems, setCollapsedItem] = useState<string[]>(['special']);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [value, setValue] = useState(10);
  const [showRules, setShowRules] = useState(false);
  const [showFaqs, setShowFaqs] = useState(false);

  const handleInputChange = (
    _: ChangeEvent<HTMLInputElement> | null,
    {
      value,
    }: {
      value: number | '';
    },
  ) => {
    setValue(value !== '' ? value : MIN);
  };

  const handleSliderChange = ({ value }: { value: number }) => {
    setValue(value);
  };

  const handleBlur = () => {
    if (!value || value < MIN || value > MAX) {
      setValue(Math.max(MIN, Math.min(MAX, parseFloat(value.toString()))));
    }
  };

  const income = (value / 100) * SUM_HUNDLE;
  const netIncome = income * (YOUR_PART / 100);

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    window.gtag('event', '7204_landing_next_click', { var: 'var4' });
    setLoading(true);
    setLoading(false);
    setThx(true);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.glass}>
          <Typography.TitleResponsive
            style={{ maxWidth: '235px' }}
            tag="h1"
            view="large"
            font="system"
            weight="medium"
            color="primary"
          >
            Торгуйте
            <br />
            портфелем
            <br />
            до 100 000 ₽
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="primary">
            Забирайте до 70% прибыли
            <br /> с фиксированным риском
          </Typography.Text>
          <img src={hb} width="100%" height={150} alt="hb" style={{ objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Почему стоит участвовать
        </Typography.TitleResponsive>

        {reasons.map((item, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="top">
              <img src={item.img} width={48} height={48} alt={item.title} />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary">
                  {item.title}
                </Typography.TitleResponsive>
                <Typography.Text view="primary-small" color="secondary">
                  {item.subtitle}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Как проходит испытание
        </Typography.TitleResponsive>

        {conditions.map((item, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="top">
              <img src={item.img} width={48} height={48} alt={item.title} />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary">
                  {item.title}
                </Typography.TitleResponsive>
                <Typography.Text view="primary-small" color="secondary">
                  {item.subtitle}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.Text view="primary-small" color="secondary">
          Если просадка портфеля более 1%, то испытание не пройдено. Можно повторить участие за 2 000 ₽
        </Typography.Text>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          После успешного испытания
        </Typography.TitleResponsive>

        <PureCell className={appSt.banner}>
          <PureCell.Graphics verticalAlign="center">
            <img src={ban1} width={48} height={48} alt="Banner" />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary">
                До 70% прибыли
              </Typography.TitleResponsive>
              <Typography.Text view="primary-small" color="secondary">
                Ваша доля от профита составляет до 70%. Выплаты производятся регулярно по итогам периода
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Кому подойдёт
        </Typography.TitleResponsive>

        {forWhom.map((item, index) => (
          <PureCell key={index}>
            <PureCell.Graphics verticalAlign="top">
              <img src={item.img} width={48} height={48} alt={item.title} />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="medium" color="primary">
                  {item.title}
                </Typography.TitleResponsive>
                <Typography.Text view="primary-small" color="secondary">
                  {item.subtitle}
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        ))}

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Сколько можно заработать
        </Typography.TitleResponsive>

        <SliderInput
          onClick={() => {
            window.gtag('event', '7204_calc_prcnt_click', { var: 'var4' });
          }}
          block
          value={value}
          sliderValue={value}
          onInputChange={handleInputChange}
          onSliderChange={handleSliderChange}
          onBlur={handleBlur}
          min={MIN}
          max={MAX}
          pips={{
            mode: 'values',
            values: [MIN, MAX],
            format: {
              to: value => `${value}%`,
            },
          }}
          range={{
            min: 1,
            max: 100,
          }}
          step={1}
          label="Выберите процент роста портфеля"
          labelView="outer"
        />

        <div className={appSt.calcBanner}>
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small">Размер счёта</Typography.Text>
            <Typography.Text view="primary-small" color="primary">
              {SUM_HUNDLE.toLocaleString('ru-RU')} ₽
            </Typography.Text>
          </div>
          <Divider />
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small">Ваша доля от прибыли</Typography.Text>
            <Typography.Text view="primary-small" color="primary">
              {YOUR_PART}%
            </Typography.Text>
          </div>
          <Divider />
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small">Полученная прибыль</Typography.Text>
            <Typography.Text view="primary-small" color="primary">
              {income.toLocaleString('ru-RU')} ₽
            </Typography.Text>
          </div>
          <Divider />
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="primary">
              Ваш заработок
            </Typography.Text>
            <Typography.Text view="primary-small" color="primary" weight="bold">
              {netIncome.toLocaleString('ru-RU')} ₽
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Сравнение подходов
        </Typography.TitleResponsive>

        <div className={appSt.compareTable}>
          <div className={appSt.rowSb} style={{ padding: '12px' }}>
            <Typography.Text view="primary-small" color="primary" weight="medium">
              {compareData[0].l}
            </Typography.Text>
            <Typography.Text view="primary-small" color="positive" weight="medium">
              {compareData[0].r}
            </Typography.Text>
          </div>
          <Divider />
          {compareData.slice(1).map((item, index) => (
            <Fragment key={index}>
              <div className={appSt.rowSb} style={{ padding: '12px', backgroundColor: '#F2F3F5' }}>
                <Typography.Text view="primary-small" color="primary" weight="medium">
                  {item.l}
                </Typography.Text>
                <Typography.Text view="primary-small" color="primary" weight="medium">
                  {item.r}
                </Typography.Text>
              </div>
              {index !== compareData.slice(1).length - 1 && <Divider />}
            </Fragment>
          ))}
        </div>

        <Typography.TitleResponsive
          style={{ marginTop: '12px' }}
          tag="h2"
          view="small"
          font="system"
          weight="medium"
          color="primary"
        >
          Тариф
        </Typography.TitleResponsive>

        <div className={appSt.calcBanner} style={{ gap: '1rem' }}>
          <div>
            <Typography.Text view="primary-small" color="primary" weight="bold" defaultMargins={false} tag="p">
              Trader
            </Typography.Text>
            <Typography.Text view="primary-small">Брокерский счёт</Typography.Text>
            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="medium" color="primary">
              {SUM_HUNDLE.toLocaleString('ru-RU')} ₽
            </Typography.TitleResponsive>
          </div>

          <div>
            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small">Участие в испытании</Typography.Text>
              <Typography.Text view="primary-small" color="primary">
                2 000 ₽
              </Typography.Text>
            </div>
            <Gap size={8} />
            <Divider />
            <Gap size={8} />

            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small">Доплата после испытания</Typography.Text>
              <Typography.Text view="primary-small" color="primary">
                Не требуется
              </Typography.Text>
            </div>
            <Gap size={8} />

            <Divider />
            <Gap size={8} />

            <div className={appSt.rowSb}>
              <Typography.Text view="primary-small">Доля результата</Typography.Text>
              <Typography.Text view="primary-small" color="positive">
                {YOUR_PART}%
              </Typography.Text>
            </div>
          </div>
        </div>
        <div />

        <PureCell
          onClick={() => {
            window.gtag('event', '7204_main_rules', { var: 'var4' });
            setShowRules(true);
          }}
        >
          <PureCell.Graphics verticalAlign="top">
            <DocumentLinesMIcon />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.Text view="primary-medium" color="primary">
                Основные правила
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>
        <div />

        <PureCell
          onClick={() => {
            window.gtag('event', '7204_prop_faq_start_click', { var: 'var4' });
            setShowFaqs(true);
          }}
        >
          <PureCell.Graphics verticalAlign="top">
            <QuestionCircleMIcon />
          </PureCell.Graphics>
          <PureCell.Content>
            <PureCell.Main>
              <Typography.Text view="primary-medium" color="primary">
                Вопросы и ответы
              </Typography.Text>
            </PureCell.Main>
          </PureCell.Content>
        </PureCell>
      </div>
      <Gap size={128} />

      <div className={appSt.bottomBtn}>
        <Button
          loading={loading}
          size={72}
          block
          view="primary"
          onClick={submit}
          style={{ padding: '1rem', borderRadius: '24px' }}
        >
          <div className={appSt.rowSb}>
            <div style={{ textAlign: 'left' }}>
              <Typography.Text view="primary-medium" color="primary-inverted" weight="medium" tag="p" defaultMargins={false}>
                Принять участие
              </Typography.Text>
              <Typography.Text view="secondary-large" style={{ color: '#7F7F83' }}>
                Стоимость испытания 2 000 ₽
              </Typography.Text>
            </div>
            <SuperEllipse backgroundColor="#FFFFFF" size={48}>
              <ArrowRightMIcon color="#212124" />
            </SuperEllipse>
          </div>
        </Button>
      </div>

      <BottomSheet
        open={showFaqs}
        onClose={() => {
          setShowFaqs(false);
        }}
        contentClassName={appSt.btmContent}
        title="Вопросы и ответы"
        hasCloser
        stickyHeader
      >
        <div className={appSt.container}>
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                onClick={() => {
                  window.gtag('event', '7204_prop_faq_click', { faq: String(index + 1), var: 'var4' });
                  setCollapsedItem(items =>
                    items.includes(String(index + 1))
                      ? items.filter(item => item !== String(index + 1))
                      : [...items, String(index + 1)],
                  );
                }}
                className={appSt.rowSb}
              >
                <Typography.Text view="primary-medium" weight="medium" color="primary">
                  {faq.question}
                </Typography.Text>
                {collapsedItems.includes(String(index + 1)) ? (
                  <div style={{ flexShrink: 0 }}>
                    <ChevronUpMIcon color="#fff" />
                  </div>
                ) : (
                  <div style={{ flexShrink: 0 }}>
                    <ChevronDownMIcon color="#fff" />
                  </div>
                )}
              </div>
              <Collapse expanded={collapsedItems.includes(String(index + 1))}>
                {faq.answers.map((answerPart, answerIndex) => (
                  <Typography.Text key={answerIndex} tag="p" defaultMargins={false} view="primary-medium" color="primary">
                    {answerPart}
                  </Typography.Text>
                ))}
              </Collapse>
            </div>
          ))}
        </div>
      </BottomSheet>
      <BottomSheet
        open={showRules}
        onClose={() => {
          setShowRules(false);
        }}
        contentClassName={appSt.btmContent}
        title="Основные правила"
        hasCloser
        stickyHeader
      >
        <div className={appSt.container}>
          <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary">
            Этап отбора
          </Typography.TitleResponsive>

          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Цель по прибыли
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              2% за период
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Максимальная просадка
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              1%
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Минимум торговых дней
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              2 недели
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Макс. размер позиции
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              100% от счёта
            </Typography.Text>
          </div>

          <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary">
            Этап реальной торговли
          </Typography.TitleResponsive>

          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Максимальная просадка
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              1%
            </Typography.Text>
          </div>
          <div className={appSt.rowSb}>
            <Typography.Text view="primary-small" color="secondary">
              Макс. размер позиции
            </Typography.Text>
            <Typography.Text view="primary-small" weight="medium" color="primary">
              100% от счёта
            </Typography.Text>
          </div>

          <Typography.TitleResponsive tag="h5" view="xsmall" font="system" weight="medium" color="primary">
            Запрещено:
          </Typography.TitleResponsive>

          <List tag="ul" marker="•" colorMarker="accent">
            <List.Item>
              <Typography.Text view="primary-small" color="primary">
                Сделки короче 1 минуты
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary">
                За 5 минут до новостей нельзя открывать новые позиции
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary">
                Держать открытыми позиции после 23:45 по мск
              </Typography.Text>
            </List.Item>
            <List.Item>
              <Typography.Text view="primary-small" color="primary">
                Нельзя торговать в выходные дни
              </Typography.Text>
            </List.Item>
          </List>
        </div>
      </BottomSheet>
    </>
  );
};
