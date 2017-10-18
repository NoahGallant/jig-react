import Head from 'next/head'
import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar, Flex, Container } from 'rebass'
import styled from 'styled-components'

const JigToolbar = styled(Toolbar)`
	background-color: white;
	color:black;
	margin-top:20px;
`;

const JigNavLink = styled(NavLink)`
    background-color: white;
    color:black;
    font-weight:800;
    font-size:18px;
    text-transform: uppercase;
    padding-left:20px;
    padding-right:20px;
    padding-top:30px;
    padding-bottom:30px;
    img {
        width:30px;
        margin-right:10px;
    }
    
    &::placeholder{
        opacity:0.25;
    }
    
    &:hover {
    background-color:white;
    
        span {
          background-color:gray;
        }
    }
`;

const jigTheme = {
  font: '"Work Sans", "Helvetica", sans-serif',
  fontSizes: [
    12, 16, 24, 36, 48, 72
  ]
}

export default ({children, title = 'Jig'}) => (
    <Provider theme={jigTheme}>
        <Container align='baseline' width={[
            1,
            null,
            null,
            900
        ]} justify='center'>
            <JigToolbar>
                <JigNavLink href='/'>
                  <img src="/static/jig.svg"/>
                  Jig
                </JigNavLink>
                <JigNavLink
                  href='/'
                  ml='auto'
                >
                  <span>Search</span>
                </JigNavLink>
                <JigNavLink href='/'>
                  <span>App</span>
                </JigNavLink>
                <JigNavLink href='/'>
                  <span>API</span>
                </JigNavLink>
            </JigToolbar>
            <Container justify='center' width={[1, null, 500]}>
                {children}
            </Container>
        </Container>
    </Provider>
)
