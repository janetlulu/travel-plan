import React, { Component } from 'react';
import { connect } from 'react-redux';

class Msg extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div>
        {
          msg && msg.message
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    msg: store.global.errorMsg
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Msg);
