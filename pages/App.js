import { Flex } from 'grid-styled'
import Head from 'next/head'
import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar } from 'rebass'

export default ({children, title = 'Jig'}) => (
  <div>
  <Head>
    <title>{ title }</title>
    <meta charSet='utf-8' />
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
  </Head>
  <Provider>
    <Toolbar>
      <NavLink
        href='/'
        children='Search'
      />
    </Toolbar>
    <Flex wrap>
      {children}
    </Flex>
  </Provider>
  </div>
)
