import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// const styles = theme => ({
//     progress: {
//         margin: theme.spacing.unit * 2
//     }
// });

class Loader extends React.Component {
    state = {
        completed: 0
    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    timer;

    progress = () => {
        const { completed } = this.state;
        this.setState({
            completed: completed >= 100
                ? 0
                : completed + 1
        });
    };

    render() {
        return (
            <div>
                <CircularProgress
                    color="secondary"
                    variant="determinate"
                    size={50}
                    value={this.state.completed} />
            </div>
        );
    }
}

export default Loader;