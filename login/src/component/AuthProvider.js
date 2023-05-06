import { createContext, usestate } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [Auth, setAuth] = usestate({})

    return<AuthContext.Provider>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;