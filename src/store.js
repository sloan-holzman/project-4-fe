import rootReducer from './reducers/login'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

const loggerMiddleware = createLogger()


// combineReducers()...if you need mutiple reducers, you can pass them into combineReducers and it will create one rootReducer, which gets passed into createStore
// rootReducer
export default createStore(rootReducer,
applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
))
