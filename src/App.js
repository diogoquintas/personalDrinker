import React, {useState} from 'react';
import styled from '@emotion/styled';
import {css, keyframes} from '@emotion/core';

import Details from './details';
import Image from './image';

import beers from './beers.json';

const BarCounter = styled(Image)`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const hideScrollbar = css`
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
  }
`;

const List = styled.div`
  background: #0000007a;
  display: flex;
  height: 100%;
  align-items: center;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  ${hideScrollbar}
`

const Beer = styled.div`
  width: 100%;
  height: 36rem;
  flex-shrink: 0;
  scroll-snap-align: start;
  position: relative;
  cursor: pointer;
`

const BeerImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translateX(0);
  }

  40%, 43% {
    transform: translateX(-3rem);
  }

  70% {
    transform: translateX(-1.5rem);
  }

  90% {
    transform: translateX(-0.4rem);
  }
`

const Arrow = styled(Image)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  filter: invert(1);
  width: 5rem;
  height: auto;
  opacity: 0.5;
  animation: ${bounce} 1s ease infinite;
`

const Title = styled.h2`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  color: #ffffff96;
  text-align: center;
`

function App() {
  const [init, setInit] = useState(false);
  const [selected, setSelected] = useState();

  return (
    <>
      <BarCounter src={`${process.env.PUBLIC_URL}/counter.jpeg`} />
      { !init && (
        <Title>
          Pick a beer
        </Title>
      ) }
      <List onScroll={e => {
        if (e.target.scrollLeft >= 266) {
          setInit(true);
        } 
      }}>
        {beers.map(beer => (
          <Beer onClick={() => setSelected(beer)} key={beer.name}>
            <BeerImage src={`${process.env.PUBLIC_URL}/${beer.picture}`} />
          </Beer>
        ))}
      </List>
      {!init && <Arrow src={`${process.env.PUBLIC_URL}/arrow_left.png`}/>}
      <Details beer={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default App;
