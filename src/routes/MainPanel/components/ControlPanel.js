import React from 'react'
import PropTypes from 'prop-types'

class ControlPanel extends React.Component {

    componentDidMount() {
      this.props.fetchList();
    }
    render()  {
      return (
        <div>
          ControlPanl Component
         </div>
       )
     }
 }
ControlPanel.propTypes = {
}

 export default ControlPanel
