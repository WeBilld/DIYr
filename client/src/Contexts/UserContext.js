import {createContext, useState} from 'react'


const UserContext = createContext();

export function UserContextProvider({ children }) {

    const [userInfo, setUserInfo] = useState({
        user_id: null,
        email: null,
        first_name: null,
        last_name: null,
        city: null,
        info: null,
        profile_image_url: null,
        num_supporters: null,
        created_at: null
      })

      return (<UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>);
}

export default UserContext;