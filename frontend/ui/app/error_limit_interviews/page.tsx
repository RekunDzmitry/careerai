// app/error/page.tsx
import React from 'react';
import Link from 'next/link';

const ErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Что-то пошло не так</h1>
      <p>Кажется вы достигли лимита интевью на сегодня (3 за день)</p>
      <br></br>
      <br></br>
      <b><Link href="/">На главную (я ссылка - нажми меня)</Link></b>
    </div>
  );
};

export default ErrorPage;