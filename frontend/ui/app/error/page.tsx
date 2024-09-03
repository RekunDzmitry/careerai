// app/error/page.tsx
import React from 'react';
import Link from 'next/link';

const ErrorPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Что-то пошло не так</h1>
      <p>Пожалуйста, попробуйте еще раз или вернитесь на главную страницу.</p>
      <br></br>
      <br></br>
      <b><Link href="/">На главную (я ссылка - нажми меня)</Link></b>
    </div>
  );
};

export default ErrorPage;