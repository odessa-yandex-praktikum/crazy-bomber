import * as React from 'react';
import './error.css';
import {Component, ErrorInfo, ReactNode} from 'react';
import {consts} from '../../consts';
import {BackLink} from '../backLink';

interface ErrorProps {
    children: ReactNode;
}

interface ErrorState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorProps, ErrorState> {
    public state: ErrorState = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): ErrorState {
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="error-page__container">
                    <div className="error-page__content">
                        <h2 className="error-page__title">{consts.errorBoundary.title}</h2>
                        <p className="error-page__text">{consts.errorBoundary.text}</p>
                        <BackLink customClass="error-page__back-link" />
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
