/**
 * redux核心store
 */
import {createStore,applyMiddleware} from "redux"
import reducer from './reducer'
import thunk from "redux-thunk"
//默认暴露store
export default createStore(reducer,applyMiddleware(thunk))