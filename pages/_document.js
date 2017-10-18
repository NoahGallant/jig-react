import { Flex } from 'grid-styled'
import Document, { Head, Main, NextScript } from 'next/document'
import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar } from 'rebass'
import styled, {ServerStyleSheet} from 'styled-components'

export default class App extends Document {
    render () {

        const title = "Jig";
        const sheet = new ServerStyleSheet();
        const main = sheet.collectStyles(<Main/>);
        const styleTags = sheet.getStyleElement();

        return (
            <html>
                <Head>
                    <title>{ title }</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,800" rel="stylesheet"/>
                    <style>{`
                        body{
                            margin:0;
                            width:100%;
                            height:100%;
                        }
                        *{
                            box-sizing: border-box;
                        }
                        `}
                    </style>
                    {styleTags}
                </Head>
                <body className='root'>
                        {main}
                <NextScript />
                </body>
            </html>
            )
        }
}
