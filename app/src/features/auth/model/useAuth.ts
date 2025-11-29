import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { userActions, type User } from "@entities/user";



export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const signIn = (data: User) => {
        dispatch(
            userActions.setUser(data)
        )
    }

    const signOut = () => {
        navigate('/auth')
    }


    return {
        user,

        signIn,
        signOut
    }
}