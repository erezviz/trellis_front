import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
// import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";



// export function removeUser(userId) {
//     return async dispatch => {
//         try {
//             await userService.remove(userId)
//             dispatch({ type: 'REMOVE_USER', userId })
//         } catch (err) {
//             console.log('UserActions: err in removeUser', err)
//         }
//     }
// }

export function onLogin(credentials) {
    console.log('Welcome Noya To our lovly app!');
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    console.log('Welcome green Noya To our lovly app!');
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

// export function loadAndWatchUser(userId) {
//     return async (dispatch) => {
//         try {
//             const user = await userService.getById(userId);
//             dispatch({ type: 'SET_WATCHED_USER', user })
//             socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
//             socketService.off(SOCKET_EVENT_USER_UPDATED)
//             socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
//                 showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//                 dispatch({ type: 'SET_WATCHED_USER', user })
//             })
//         } catch (err) {
//             showErrorMsg('Cannot load user')
//             console.log('Cannot load user', err)
//         }
//     }
// }
