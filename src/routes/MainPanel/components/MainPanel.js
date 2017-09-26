import React from 'react'
import PropTypes from 'prop-types'

class MainPanel extends React.Component {

  render()  {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
MainPanel.propTypes = {
}

 export default MainPanel
