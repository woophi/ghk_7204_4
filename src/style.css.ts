import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const rowSb = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
});

const glass = style({
  display: 'flex',
  padding: '20px 1rem 0px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  borderRadius: '1rem',
  textAlign: 'center',
  justifyContent: 'center',
  backgroundColor: '#F2F3F5',
});
const banner = style({
  borderRadius: '24px',
  backgroundColor: '#F2F3F5',
  padding: '1rem',
});
const calcBanner = style({
  borderRadius: '24px',
  backgroundColor: '#F2F3F5',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  color: '#7F7F83',
});

const compareTable = style({
  borderRadius: '24px',
  border: '1px solid #F2F3F5',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

const btmContent = style({
  padding: 0,
});

export const appSt = {
  bottomBtn,
  container,
  rowSb,
  glass,
  banner,
  calcBanner,
  compareTable,
  btmContent,
};
