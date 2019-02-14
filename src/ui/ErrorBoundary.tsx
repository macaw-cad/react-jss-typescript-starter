import * as React from 'react';

interface ErrorInfo {
    componentStack: string;
}

interface ErrorBoundaryState {
    error?: Error;
    errorInfo?: ErrorInfo;
}
export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
      super(props);
      this.state = { error: undefined, errorInfo: undefined };
    }
    
    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      // You can also log error messages to an error reporting service here
    }
    
    public render(): React.ReactNode | undefined {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }