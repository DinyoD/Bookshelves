import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AppErrorBoundary extends Component {

    constructor(props){
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                <h2>Page not found.</h2>
                <h4>Our apologies, this is almost certainly not the page you were looking for.</h4>
                <h4>Please try the search tool, above, or visit our <Link to="/">home page</Link>.</h4>
                    <img src="/public/error-404.png" alt="Page not found"/>
                </div>
            )
        }
        return this.props.children;

    }
}

export default AppErrorBoundary;