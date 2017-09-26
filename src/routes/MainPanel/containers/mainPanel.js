 import { connect } from 'react-redux'
 import React from 'react'
 import Comp from '../components/ControlPanel'
 import { fetchList } from '../modules/mainPanel'

 const mapStateToProps = (state) => {
   return {
     data: {},
   }
 }

const mapDispatchToProps = {
    fetchList,
};


export default connect(mapStateToProps, mapDispatchToProps)(Comp)
