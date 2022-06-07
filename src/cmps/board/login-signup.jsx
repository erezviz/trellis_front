import { Component } from 'react'
import { connect } from 'react-redux'
import {
    onLogin,
    onSignup,
    onLogout
} from '../../store/user.actions'

class _LoginSignup extends Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignup: false
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onSubmitLogin = async (ev) => {
        ev.preventDefault()
        const user = await this.props.onLogin(this.state.credentials)
        if (user) this.onGoBack()
    }

    onGoBack = () => {
        this.props.history.push('/home')
    }


    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }
    render() {
        const { user } = this.props
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        return (
            <div className="login-page">
                {!user && < section className="login-signup">
                    {!isSignup && <form className="login-form" onSubmit={(event) => { this.onSubmitLogin(event) }}>
                        <div className='flex-col'>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Username"
                                onChange={this.handleChange}
                                required
                                autoFocus
                            />
                        </div>
                        <div className='flex-col'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button >Login!</button>
                    </form>}

                    <div className="signup-section">
                        {isSignup && <form className="signup-form" onSubmit={this.onSignup}>
                            <div className='flex-col'>
                                <label htmlFor="fullname">Full name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={fullname}
                                    placeholder="Fullname"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className='flex-col'>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className='flex-col'>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <button onClick={() => { this.props.onSignup(this.state.credentials) }} >Signup!</button>
                        </form>}
                    </div>
                    <p>
                        <a href="#" onClick={this.toggleSignup}>{!isSignup ? 'Not a member? Signup!' : 'Already a member? Login!'}</a>
                    </p>
                </section>}

                {user && <button onClick={() => this.onGoBack()}>Enter Boards</button>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        User: state.userModule.user
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout
}


export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)