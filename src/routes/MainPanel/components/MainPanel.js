import React from 'react'
import PropTypes from 'prop-types'

class Index extends React.Component {

    render()  {
      return (
        <div>
          Index
          {this.props.children}
         </div>
       )
     }
 }
Index.propTypes = {
 }

 export default Index
