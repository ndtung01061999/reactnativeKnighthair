import {combineReducers} from 'redux';
const appState = {idaccount:0}

const numberReducer = (state=appState, action) => {
    switch (action.type) {
        case 'LOGIN':
            state = {
                idaccount:action?.idaccount,
                name:action?.name,
                password:action?.password
            }
    }
    return state
}


const allReducers = combineReducers({
    numberReducer,
});

export default allReducers;