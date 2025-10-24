/** ErrorBoundary Component:
 * Catches any JavaScript error in the component tree below it.
 * Displays a fallback UI instead of crashing the app.
 * getDerivedStateFromError():
 * Updates the state when an error is detected.
 * componentDidCatch():
 * Logs error details for debugging.
 * Reload Button:
 * Provides a way for the user to refresh and try again.
 * */
import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
          <p>{this.state.error?.message}</p>
          <button
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
