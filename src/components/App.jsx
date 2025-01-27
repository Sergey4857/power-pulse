import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Main from 'pages/Main/Main';
import Error from 'pages/Error/Error';
import PrivateRoute from 'components/PrivateRoute';
import RestrictedRoute from 'components/RestrictedRoute';
import ErrorHandler from './common/ErrorHandler/ErrorHandler';

import { setCredentials } from 'src/redux/auth/authSlice';
import { useLazyRefreshQuery } from 'src/redux/api';
import { selectToken } from 'src/redux/auth/selectors';
import { ROUTER, DATA_STEPS } from 'src/utils';
import { setStates } from '../redux/states/statesSlice';

const router = createBrowserRouter(
  [
    {
      path: ROUTER.MAIN,
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          path: ROUTER.WELCOME,
          async lazy() {
            let { Welcome } = await import('pages/Welcome/Welcome');
            return {
              Component: () => (
                <RestrictedRoute
                  redirectTo={ROUTER.DIARY}
                  component={<Welcome />}
                />
              ),
            };
          },
        },
        {
          path: ROUTER.SIGN_UP,
          async lazy() {
            let { SignUp } = await import('pages/SignUp/SignUp');
            return {
              Component: () => (
                <RestrictedRoute
                  redirectTo={ROUTER.DIARY}
                  component={<SignUp />}
                />
              ),
            };
          },
        },
        {
          path: ROUTER.DATA,
          async lazy() {
            let { Data } = await import('pages/Data/Data');
            return {
              Component: Data,
            };
          },
          children: [
            {
              path: DATA_STEPS.FIRST,
              async lazy() {
                let { FirstStep } = await import('./data/FirstStep/FirstStep');
                return {
                  Component: FirstStep,
                };
              },
            },
            {
              path: DATA_STEPS.SECOND,
              async lazy() {
                let { SecondStep } = await import(
                  './data/SecondStep/SecondStep'
                );
                return {
                  Component: SecondStep,
                };
              },
            },
            {
              path: DATA_STEPS.THIRD,
              async lazy() {
                let { ThirdStep } = await import('./data/ThirdStep/ThirdStep');
                return {
                  Component: ThirdStep,
                };
              },
            },
          ],
        },
        {
          path: ROUTER.SIGN_IN,
          async lazy() {
            let { SignIn } = await import('pages/SignIn/SignIn');
            return {
              Component: () => (
                <RestrictedRoute
                  redirectTo={ROUTER.DIARY}
                  component={<SignIn />}
                />
              ),
            };
          },
        },

        // ------------------------------
        {
          path: ROUTER.CALENDAR,
          async lazy() {
            let { Calendar } = await import('pages/Calendar/Calendar');
            return {
              Component: () => (
                <PrivateRoute
                  redirectTo={ROUTER.SIGN_IN}
                  component={<Calendar />}
                />
              ),
            };
          },
        },
        // ===================================

        {
          path: ROUTER.PROFILE,
          async lazy() {
            let { Profile } = await import('pages/Profile/Profile');
            return {
              Component: () => (
                <PrivateRoute
                  redirectTo={ROUTER.SIGN_IN}
                  component={<Profile />}
                />
              ),
            };
          },
        },
        {
          path: ROUTER.DIARY,
          async lazy() {
            let { Diary } = await import('pages/Diary/Diary');
            return {
              Component: () => (
                <PrivateRoute
                  redirectTo={ROUTER.SIGN_IN}
                  component={<Diary />}
                />
              ),
            };
          },
        },
        {
          path: ROUTER.PRODUCTS,
          async lazy() {
            let { Products } = await import('pages/Products/Products');
            return {
              Component: () => (
                <PrivateRoute
                  redirectTo={ROUTER.SIGN_IN}
                  component={<Products />}
                />
              ),
            };
          },
        },
        {
          path: ROUTER.EXERCISES,
          async lazy() {
            let { Exercises } = await import('pages/Exercises/Exercises');
            return {
              Component: () => (
                <PrivateRoute
                  redirectTo={ROUTER.SIGN_IN}
                  component={<Exercises />}
                />
              ),
            };
          },
          children: [
            {
              index: true,
              async lazy() {
                let { ExercisesSubcategoriesList } = await import(
                  'components/exercises/ExercisesSubcategoriesList/ExercisesSubcategoriesList'
                );
                return {
                  Component: () => (
                    <PrivateRoute
                      redirectTo={ROUTER.SIGN_IN}
                      component={<ExercisesSubcategoriesList />}
                    />
                  ),
                };
              },
            },
            {
              path: ROUTER.SUBCATEGORY,
              async lazy() {
                let { ExercisesList } = await import(
                  'components/exercises/ExercisesList/ExercisesList'
                );
                return {
                  Component: () => (
                    <PrivateRoute
                      redirectTo={ROUTER.SIGN_IN}
                      component={<ExercisesList />}
                    />
                  ),
                };
              },
            },
          ],
        },
      ],
    },
  ],
  {
    basename: '/power-pulse/',
  },
);

export default function App() {
  const [refresh, { isFetching, isError, error }] = useLazyRefreshQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(setStates({ isLoading: isFetching, isError, error }));
  }, [dispatch, error, isError, isFetching]);

  // Refetch current user data on reloading page
  useEffect(() => {
    const refetch = async () => {
      if (token) {
        try {
          const { user } = await refresh().unwrap();
          dispatch(setCredentials({ user, token }));
        } catch (error) {
          console.error(error);
        }
      }
    };

    refetch();
  }, [dispatch, token, refresh]);

  return (
    <>
      <RouterProvider router={router} />
      <ErrorHandler />
    </>
  );
}
