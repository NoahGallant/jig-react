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

    img{
        width:30px;
        margin-right:10px;
    }
    


    &:hover{
        span{
            background-color:gray;
        }
        background-color:white;
    }
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <Provider theme={{
            font: '"Work Sans", Helvetica, sans-serif',
            fontSizes: [
                12, 16, 24, 36, 48, 72
            ]
        }}>
            <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,800" rel="stylesheet"/>
            <JigToolbar>
                <JigNavLink
                    href='/'>
                    <img src="/static/jig.svg"/>
                    JIG
                </JigNavLink>
                <JigNavLink
                    href='/'
                    ml='auto'
                >
                    <span>SEARCH</span>
                </JigNavLink>
                <JigNavLink
                    href='/'
                >
                    <span>APP</span>
                </JigNavLink>
                <JigNavLink
                    href='/'
                >
                    <span>API</span>
                </JigNavLink>

                </JigToolbar>
                {this.props.children}
      </Provider>
    )
  }
}

export default App;
