import { Component } from 'react'
import { userService } from '../../services/user.service'  


export class LoginSignup extends Component {
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


    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    render() {
        console.log('hello from login');
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        return (
           
            <div className="login-page">
                <p>
                    <a href="#" onClick={this.toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</a>
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
                    <button onClick={() => { this.props.onLogin(this.state.credentials) }} >Login!</button>
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
                        <button onClick={() => { this.props.onSignup(this.state.credentials) }} >Signup!</button>
                    </form>}
                </div>

            </div>
        )
    }
}