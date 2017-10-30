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
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel="apple-touch-icon" sizes="57x57" href="/static/meta/apple-icon-57x57.png"/>
                    <link rel="apple-touch-icon" sizes="60x60" href="/static/meta/apple-icon-60x60.png"/>
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/meta/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="/static/meta/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="/static/meta/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/meta/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="/static/meta/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/meta/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/meta/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192"  href="/static/meta/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/meta/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="/static/meta/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/meta/favicon-16x16.png"/>
                    <link rel="manifest" href="/static/meta/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-TileImage" content="/static/meta/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <link href="https://fonts.googleapis.com/css?family=Rubik:400,500,700,900" rel="stylesheet"/>
                    <style>{`
                        body{
                            margin:0;
                            width:100%;
                            height:100%;
                            font-family: 'Rubik';
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
