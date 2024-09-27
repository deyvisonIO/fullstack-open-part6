import { createContext, useContext, useReducer } from "react";


const notificationReducer = (state = "", action) => {
  switch(action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "CLEAR":
      return ""
  }
}

export const NotificationContext = createContext() 

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext)
  return counterAndDispatch[1]
}

