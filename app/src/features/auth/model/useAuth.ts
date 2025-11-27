import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import type { User } from "@entities/user";
import { userActions } from "@entities/user";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const signIn = (data: User) => {
        dispatch(
            userActions.setUser(data)
        )
        navigate('/')
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