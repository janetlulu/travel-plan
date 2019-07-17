import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loading extends Component {
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {
          isLoading && 'Loading...'
        }
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    isLoading: store.global.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
