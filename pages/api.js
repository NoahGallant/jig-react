import Layout from '../components/Layout'
import React, { Component } from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Badge from '../components/Badge'

class Mac extends Component {

    render(){
        return (
            <Layout>
                <title>
                    Jig — Music Sharing
                </title>
                <Flex wrap mx={-2}>
                    <Box width={1} mt={5} mb={2}>
                        <h1>Jig API</h1>
                        <Badge color='#FFE1EA'>v 0.1</Badge>
                        <h2>Linking</h2>
                        <p>In order to generate a link, simply find the Apple Music 'Item ID' for your song and place it in the following format:</p>
                        <Badge size='16' color='#EDF1F4' font='Monaco'><u>https://jig.sh/ar?e=<b>AppleID</b></u></Badge>
                        <h2>Searching</h2>
                        <p>Search REST API coming soon.</p>
                    </Box>
                </Flex>
                <Footer/>
            </Layout>
        )
    }
}

export default Mac
