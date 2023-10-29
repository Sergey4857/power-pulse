import ExercisesItem from '../ExercisesItem/ExercisesItem';
import {
  BackgroundDiv,
  ContentDiv,
  ExerciseListUl,
  LinkTextP,
  StyledLink,
  Svg,
  WrapLi,
} from './ExercisesList.styled';
import { useLocation, useOutletContext, useParams } from 'react-router';
import {
  useLazyFetchAllExercisesQuery,
  useFetchExercisesSubcategoriesQuery,
} from '../../../redux/api';
import { useEffect, useRef, useState } from 'react';
import sprite from 'src/assets/images/sprite/sprite.svg';
import { useInView } from 'react-intersection-observer';
import Loader from 'components/Loader/Loader';
export function ExercisesList() {
  const category = useOutletContext();
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState([]);
  const { subcategory } = useParams();
  const { ref } = useInView({
    onChange: inView => inView && setFetching(true),
  });

  const location = useLocation();
  const pathLocation = useRef(location.state?.from ?? '/exercises');
  const [fetchAllExercises, isFetching, isError] =
    useLazyFetchAllExercisesQuery();
  const listRef = useRef();

  const { data } = useFetchExercisesSubcategoriesQuery(category);

  const currentBackgroundImage =
    data && data.filter(item => item.name === subcategory)[0];
  const backgroundImage = currentBackgroundImage
    ? currentBackgroundImage.imgURL
    : null;

  useEffect(() => {
    if (fetching) {
      setLoading(true);
      const fetch = async () => {
        try {
          const response = await fetchAllExercises({
            page,
            [category]: subcategory,
          }).unwrap();
          page === 1
            ? setResult([...response])
            : setResult(prev => [...prev, ...response]);

          setFetching(false);
          setPage(page + 1);

          setLoading(false);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetch();
    }
  }, [page, fetchAllExercises, fetching, category, subcategory]);

  return (
    <ContentDiv>
      <StyledLink to={pathLocation.current}>
        <Svg>
          <use href={`${sprite}#icon-arrow`}></use>
        </Svg>
        <LinkTextP>Back</LinkTextP>
      </StyledLink>

      <ExerciseListUl ref={listRef}>
        {result?.map(
          (
            {
              _id,
              name,
              bodyPart,
              burnedCalories,
              target,
              gifUrl,
              time,
              equipment,
            },
            index,
          ) => (
            <WrapLi key={index} ref={index === result.length - 1 ? ref : null}>
              <ExercisesItem
                key={_id}
                _id={_id}
                bodyPart={bodyPart}
                equipment={equipment}
                gifUrl={gifUrl}
                name={name}
                target={target}
                burnedCalories={burnedCalories}
                time={time}
              />
            </WrapLi>
          ),
        )}
      </ExerciseListUl>
      <BackgroundDiv category={category} img={backgroundImage} />
    </ContentDiv>
  );
}
