import { Component } from "react";
import type { ReactNode } from "react";
import ErrorPage from "./Errorpage";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class AppErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: unknown) {
        // branche ici ton outil de logging (Sentry, etc.) si besoin
        console.error("Erreur non interceptée :", error, info);
    }

    handleRetry = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorPage onRetry={this.handleRetry} />;
        }
        return this.props.children;
    }
}