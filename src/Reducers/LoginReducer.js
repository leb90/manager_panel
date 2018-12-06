import Auth from '../lib/Auth/Auth';
import { AUTHENTICATED, USERS, GET_USER, DELETE_USER, RESET_STORE, ADD_USER, EDIT_USER } from '../Constants';

const initialState = {
    allUsers: [],
    authenticated: false,
    token: "",
    user: null
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            if (action.token !== "") {
                return {
                    ...state,
                    authenticated: true,
                    token: action.token
                };
            } else {
                return {
                    ...state,
                    authenticated: false
                }
            }

        case USERS:
            return {
                ...state,
                allUsers: action.data,
            };
        case GET_USER:
            return {
                ...state,
                user: action.data
            }                  

        case EDIT_USER:   
            return {
                ...state,
                user: action.data 
            }
        case ADD_USER: 
            return {
                ...state,
                allUsers: state.allUsers.data.push(action.data)
            }
        
        case RESET_STORE:
            return {
                ...state,
                allUsers: [],
                authenticated: false,
                token: "",
                user: null
            }
        default:
            return state;
    }
}

export default LoginReducer