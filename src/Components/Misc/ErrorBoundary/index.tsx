import React, { ErrorInfo } from 'react';

import { Button, Paper, Theme, withStyles } from '@material-ui/core';

// Styling
const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        height: 380,
        width: 500,
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            flex: 1,
        },
    },
    content: {
        marginTop: 20,
    },
    heading: {
        margin: '20px 0 12px 0',
    },
    errorText: {
        margin: 0,
        fontSize: '1.1rem',
        color: theme.palette.text.secondary,
    },
    retryButton: {
        marginTop: 30,
    },
});

interface IErrorBoundaryProps {
    classes: Record<string, string>;
}

interface IErrorBoundaryState {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

// Top level error boundary
class ErrorBoundary extends React.Component<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    state: IErrorBoundaryState = { error: null, errorInfo: null };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    handleClick() {
        window.location.reload();
    }

    render() {
        const { classes } = this.props;

        if (this.state.errorInfo) {
            console.log(this.state.error);
            return (
                <div className={classes.root}>
                    <Paper elevation={3} className={classes.paper}>
                        <div className={classes.animation}></div>
                        <h2 className={classes.heading}>
                            Something went wrong
                        </h2>
                        <p className={classes.errorText}>
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <Button
                            className={classes.retryButton}
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={this.handleClick}
                        >
                            Retry
                        </Button>
                    </Paper>
                </div>
            );
        }

        return this.props.children;
    }
}

export default withStyles(styles)(ErrorBoundary);
