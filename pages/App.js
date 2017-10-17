import { NavLink, Provider } from 'rebass'
import React, { Component } from 'react'
import { Toolbar } from 'rebass'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider>
        <Toolbar>
          <NavLink
            href='/'
            children='Search'
          />
        </Toolbar>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;
