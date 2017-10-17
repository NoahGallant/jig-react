import { Flex } from 'grid-styled'
import Head from 'next/head'
import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar } from 'rebass'
import styled from 'styled-components'

const JigToolbar = styled(Toolbar)`
	background-color: white;
	color:black;
`;

const JigNavLink = styled(NavLink)`
  background-color: white;
  color:black;
  font-weight:800;
  padding:30px;
  font-size:18px;
  text-transform: uppercase;

  img {
    width:30px;
    margin-right:10px;
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
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,800" rel="stylesheet"/>
    </Head>
    <Provider theme={jigTheme}>
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
      <Flex wrap>
        {children}
      </Flex>
    </Provider>
  </div>
)
