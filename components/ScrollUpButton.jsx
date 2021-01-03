import React from 'react';
import debounce from 'lodash.debounce';

import usePageScroll from 'hooks/usePageScroll';
import SVG from './SVG';
import { scrollToTop } from 'utils';

const ScrollUpButton = ({ visible, setVisible }) => {
  usePageScroll(
    debounce(
      ({ target: { documentElement, body } }) => {
        setVisible(
          (documentElement.scrollTop || body.scrollTop) >
            documentElement.clientHeight * 0.5,
        );
      },
      250,
      { maxWait: 500 },
    ),
  );

  return (
    (visible && (
      <button
        className="fixed z-10 w-12 h-12 px-2 py-1 text-center rounded-full opacity-50 bg-emerald-200 text-emerald-500 right-3 bottom-20 lg:bottom-12 hover:opacity-100 lg:w-20 lg:h-20 scrollToTopBtn"
        onClick={scrollToTop}>
        <SVG.ArrowToTop
          className="w-8 h-8 mx-auto fill-current lg:w-12 lg:h-12"
          width="100%"
          height="100%"
        />
      </button>
    )) ||
    null
  );
};

export default ScrollUpButton;
