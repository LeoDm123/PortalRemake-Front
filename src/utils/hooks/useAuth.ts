import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import {
    LOCAL_STORAGE_USER_KEY,
    LOCAL_STORAGE_TOKEN_KEY,
} from '../../services/LocalStorageService'
import { fetchLoginUser } from '../../api/api'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential,
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await fetchLoginUser(values.email, values.password)

            if ('token' in resp) {
                dispatch(signInSuccess(resp.token))

                const user = resp.user || {
                    avatar: '',
                    userName: 'Anonymous',
                    authority: ['USER'],
                    email: '',
                }

                dispatch(setUser(user))

                const redirectUrl =
                    query.get(REDIRECT_URL_KEY) ||
                    appConfig.authenticatedEntryPath
                navigate(redirectUrl)

                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    // const login = async (email: string, password: string): Promise<string> => {
    //     try {
    //         const data = await fetchLoginUser(email, password)

    //         if (data) {
    //             setUser(data.user)
    //             const { token } = data
    //             dispatch(signInSuccess(token))

    //             localStorage.setItem(
    //                 LOCAL_STORAGE_USER_KEY,
    //                 JSON.stringify(data.user),
    //             )
    //             localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token)

    //             return 'ok'
    //         } else {
    //             alert('Credenciales incorrectas')
    //             return 'err'
    //         }
    //     } catch (error) {
    //         console.error('Error al iniciar sesión', error)
    //         alert('Error al iniciar sesión')
    //         return 'err'
    //     }
    // }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            },
                        ),
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl
                        ? redirectUrl
                        : appConfig.authenticatedEntryPath,
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            }),
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        // await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        //login,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
