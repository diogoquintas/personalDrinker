import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import Image from '../image';

const AnimatedDiv = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: white;
`;

const Wrapper = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Img = styled(Image)`
    height: 50%;
    object-fit: contain;
    object-position: bottom;
`;

const Button = styled.button`
    position: fixed;
    top: 0;
    right: 0;
    padding: 0.7rem;
    width: 5rem;
    height: 5rem;
    background: none;
    border: 0;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
`;

const DetailsInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Name = styled.p`
    font-size: 2.5rem;
    margin-bottom: 0;
    text-align: center;
`;

const From = styled.p`
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
`;

const DetailsP = styled.p`
    margin: 0;
    display: flex;
    align-items: center;
    text-align: center;
`;

const CountryP = styled.p`
    margin: 0;
    display: flex;
    align-items: center;
    text-align: center;
    position: relative;
`;

const CountryImg = styled(Image)`
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    position: absolute;
    top: 50%;
    left: -1.5rem;
    transform: translateY(-50%);
`;

const Link = styled.a`
    color: black;
`;

function Details({ beer, onClose }) {
    const open = !!beer;

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const animation = {
        visible: {
            scaleX: [0, 0.01, 0.01, 1],
            scaleY: [0, 0.2, 1, 1],
            transition: { duration: 0.5 }
        },
        collapsed: {
            scaleX: [1, 0.01, 0.01, 0],
            scaleY: [1, 1, 0.2, 0],
            transition: { duration: 0.5 }
        }
    };

    const animationContent = {
        visible: {
            opacity: 1,
            transition: { delay: 0.7, duration: 0.2 }
        },
        collapsed: {
            opacity: 0,
            transition: { duration: 0 }
        }
    };

    return (
        <AnimatedDiv
            initial="collapsed"
            animate={open ? 'visible' : 'collapsed'}
            variants={animation}
        >
            <Wrapper
                animate={open ? 'visible' : 'collapsed'}
                variants={animationContent}
            >
                <Img
                    alt={beer?.name}
                    src={`${process.env.PUBLIC_URL}/${beer?.picture}`}
                />
                <Button onClick={onClose}>
                    <Image src={`${process.env.PUBLIC_URL}/close.png`} />
                </Button>
                <DetailsInfo>
                    <Name>{beer?.name}</Name>
                    <From>by {beer?.manufacturer}</From>
                    <DetailsP>{beer?.style}</DetailsP>
                    <DetailsP>{beer?.alcohol}</DetailsP>
                    <CountryP>
                        <CountryImg
                            alt={beer?.country}
                            src={`${process.env.PUBLIC_URL}/${beer?.flag}`}
                        />
                        <span>{beer?.country}</span>
                    </CountryP>
                    <p>
                        <Link
                            href={beer?.link}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            more!
                        </Link>
                    </p>
                </DetailsInfo>
            </Wrapper>
        </AnimatedDiv>
    );
}

export default Details;
