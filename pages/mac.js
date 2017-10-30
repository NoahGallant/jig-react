import Layout from '../components/Layout'
import React, { Component } from 'react'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import Footer from '../components/Footer'

class Mac extends Component {

    render(){
        return (
            <Layout>
                <title>
                    Jig — Music Sharing
                </title>
                <Flex wrap mx={-2}>
                    <Box width={1} mt={5} mb={2}>
                        <img src="/static/jig.svg" width='50%'/><br/>
                        <h1>Mac app coming soon!</h1>
                        <p>Expected release in 2018. Jig search and share in your Mac status bar.</p>
                    </Box>
                </Flex>
                <Footer/>
            </Layout>
        )
    }
}

export default Mac
