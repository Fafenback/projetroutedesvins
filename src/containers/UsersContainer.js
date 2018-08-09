import { base, auth } from '../firebase'
import { Container } from 'unstated'

class UsersContainer extends Container {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: {},
            orderedUsers: []
        }
        this.init()
    }
    init = () => {
        base.bindToState('sommeliers', {
            context: this,
            state: "users",
            asArray: true,

        });
    }
    findOne = (email) => {
        const loggedUser = auth.currentUser
            ? auth.currentUser.email
            : null

        if (this.state !== undefined && loggedUser) {
            // const loggedUser = auth.currentUser.user.email
            const { users } = this.state
            const user = users.filter(elt => elt.email === email)
            this.setState({ user })
        }
    }
    findAll = () => {
        const { users } = this.state;

        this.setState({ orderedUsers: users })
    }
}

export default UsersContainer;