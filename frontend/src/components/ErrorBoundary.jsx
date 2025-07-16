import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    margin: '20px',
                    border: '1px solid #ff6b6b',
                    borderRadius: '8px',
                    backgroundColor: '#fff5f5',
                    color: '#ff6b6b'
                }}>
                    <h3>Something went wrong in this section.</h3>
                    <p>We're working to fix this issue. Please try refreshing the page.</p>
                    {process.env.NODE_ENV === 'development' && (
                        <details style={{ marginTop: '10px', color: '#495057' }}>
                            <summary>Error details</summary>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.error && this.state.error.toString()}
                                <br /><br />
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;