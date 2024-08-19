import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorinfo) {
    console.error("ErrorBoundary caught an error", error, errorinfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>¡Algo salió mal!</h1>;
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {   children: PropTypes.node };

export default ErrorBoundary;
