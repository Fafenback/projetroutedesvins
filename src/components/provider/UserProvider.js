import { Component } from 'react';
import { auth } from '../../firebase'
import PropTypes from 'prop-types'
import { base } from '../../firebase'
class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        auth.onAuthStateChanged(loggedUser => {
            loggedUser
                ? this.setState(() => ({ loggedUser }))
                : this.setState(() => ({ loggedUser: null }));
        });
        this.init()
    }
    init = () => {

        base.fetch('sommeliers', {
            context: this,
            then(data) {
                const { loggedUser } = this.state
                if (loggedUser) {
                    for (let prop in data) {
                        const { email } = loggedUser
                        if (data[prop].email.toLowerCase() === email) {
                            return this.setState({ user: data[prop] })
                        }
                    }
                }

            }
        });
    }
    getChildContext() {
        return { loggedUser: this.state.loggedUser, user: this.state.user };
    }
    render() {
        return this.props.children
    }
}
UserProvider.childContextTypes = {
    loggedUser: PropTypes.object,
    user: PropTypes.object
};

export default UserProvider;