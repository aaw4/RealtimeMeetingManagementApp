import React, { Component } from 'react';

class FormError extends Component {
  render() {
    const { E } = this.props;

    return (
      <div className="col-12 alert alert-danger px-3">
        { E }
      </div>
    );
  }
}

export default FormError;