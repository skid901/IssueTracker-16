import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import COLOR from '../../../utils/color';
import SelectModal from './SelectModal';

const Wrapper = styled.div`
  position: relative;
  min-width: 90px;

  > button {
    height: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
    font-size: 14px;
    border: 1px solid #e1e4e8;
    border-radius: 6px 0 0 6px;
    background-color: #${COLOR.backGray};
    color: #${COLOR.darkGray};

    &:hover {
      background-color: #${COLOR.lightGray};
    }
  }
`;

export default function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleClick = event => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Wrapper ref={ref}>
      <button onClick={handleClick}>Filter ▾</button>
      {isOpen && <SelectModal {...{ setIsOpen }} />}
    </Wrapper>
  );
}
