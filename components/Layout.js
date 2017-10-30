import Head from 'next/head'
import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar, Flex, Container } from 'rebass'
import styled from 'styled-components'

const JigToolbar = styled(Toolbar)`
	background-color: rgba(0,0,0,0);
	color:black;
	margin-top:20px;
	z-index:0;
`;

const JigNavLink = styled(NavLink)`
    font-size:18px;
    text-transform: uppercase;
    padding-left:10px;
    padding-right:10px;
    padding-top:30px;
    padding-bottom:30px;
    span {
        background-color: ${props => props.active ? 'none' : props.color};
        box-shadow:none;
        padding: 5px;
        padding-left:13px;
        font-size:15px;
        padding-right:13px;
        color:white;
        color:black;
        font-weight:700;
        border-radius: 5px;
    }
    
    &::placeholder{
        opacity:0.25;
    }
    
    &:hover {
    background-color:rgba(0,0,0,0);
    
        span {
          color:rgba(0,0,0,0.5);
        }
    }
`;

const JigNavLinkLogo = styled(JigNavLink)`
    font-size:22px;
    font-weight:900;
    img {
        width:30px;
        margin-right:10px;
        bottom:2px;
    }
`;



const Gradient = styled.div`
    content:' ';
    position:fixed;
    top:-5px;
    bottom:-5px;
    left: -5px;
    right:-5px;
    z-index:2;
    border-radius:10px;
    border:10px solid #CCD6DD;
    background: none;//linear-gradient(rgba(151,186,209,1), rgba(151,186,209,0));
    pointer-events: none;
`;


const jigTheme = {
  font: '"Rubik", "Helvetica", sans-serif',
  fontSizes: [
    12, 16, 24, 36, 48, 72
  ],
};

const JigContainer = styled(Container)`
    clear:both;
`;

export default ({children, title = 'Jig'}) => (
    <Provider theme={jigTheme}>
        <Gradient/>
        <Container align='baseline' width={[
            1,
            null,
            null,
            900
        ]} justify='center'>
            <JigToolbar>
                <JigNavLinkLogo href='/'>
                  <img src="/static/jig.svg"/>
                  Jig
                </JigNavLinkLogo>
                <JigNavLink
                  href='/'
                  ml='auto'
                  color='#D4E6FF'
                >
                  <span>Search</span>
                </JigNavLink>
                <JigNavLink href='/mac' color='#DAD4FF'>
                  <span>App</span>
                </JigNavLink>
                <JigNavLink href='/api' color='#EEDBFF'>
                  <span >API</span>
                </JigNavLink>
            </JigToolbar>
            <JigContainer justify='center' width={[1, null, 500]}>
                {children}
            </JigContainer>
        </Container>
    </Provider>
)
