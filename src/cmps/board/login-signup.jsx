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


    toggleSignup = (ev) => {
        ev.preventDefault()
        this.setState({ isSignup: !this.state.isSignup })
    }

    render() {
        console.log('hello from login');
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        const {onLogin, onSignup} = this.props
        return (
           
            <div className="login-page">
                <p>
                    <a href="#" onClick={(ev)=>this.toggleSignup(ev)}>{!isSignup ? 'Signup' : 'Login'}</a>
                </p>
                {!isSignup && <form className="login-form" onSubmit={this.onLogin}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <button onClick={() => {onLogin(this.state.credentials) }} >Login!</button>
                </form>}

                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={this.onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            placeholder="Fullname"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />
                        <button onClick={() => {onSignup(this.state.credentials) }} >Signup!</button>
                    </form>}
                </div>

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