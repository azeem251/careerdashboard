import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    console.log("Full year:", year);
  }, [year]);

  return (
    <footer className='Footer_wrapper'>
      <p className='mb-0'>
        © copyright all rights reserved. <span id='year_id'>{year}</span>
      </p>
      <p className='pr-3 mb-0 text-sm'>Dev By. Er.Azeem</p>
    </footer>
  );
};

export default Footer;
