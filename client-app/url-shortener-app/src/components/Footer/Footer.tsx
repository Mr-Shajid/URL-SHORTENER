import * as React from 'react';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-slate-900 text-white text-base text-center py-5'>
        Copyright &#169; URLShortener | Md. Shahriar Chy Shajid
    </div>// #169 is a code for the copyright symbol
  );
};

export default Footer;
