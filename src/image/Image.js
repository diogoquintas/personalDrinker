import React, {useState, useRef, useEffect} from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';

const Img = styled.img`
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${({loaded}) => loaded && css`
        opacity: 1;
    `}
`;

function Image({src, onLoad = () => {}, ...remainingProps}) {
    const [loaded, setLoaded] = useState(false);
    const prevSrc = useRef(src);

    useEffect(() => {
        if (src !== prevSrc.current) {
            setLoaded(false);
        }
    }, [src])

    return <Img src={src} loaded={loaded} onLoad={() => {
        setLoaded(true);
        onLoad();
    }} {...remainingProps}/>
}

export default Image;