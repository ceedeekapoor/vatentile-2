import React from 'react';
import { Helmet } from 'react-helmet';

const End = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Helmet>
        <title>BYBYE</title>
      </Helmet>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
        marginBottom: '20px',
        color: 'black',
      }}>
        Thanks for Playing! 💝
      </h1>
      <p style={{
        fontSize: '1.5rem',
        color: 'black',
        textAlign: 'center'
      }}>
        See You Soon
      </p>
    </div>
  );
};

export default End;
