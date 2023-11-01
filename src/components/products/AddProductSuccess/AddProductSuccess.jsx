import {
  DivSuccess,
  DivImg,
  TitleH2,
  DivCalories,
  CaloriesP,
  ValueCaloriesSpan,
  ButtonAdd,
  DivLink,
  LinkText,
} from './AddProductSuccess.styled';

export default function AddProductSuccess({ onClose, totalCalories }) {
  return (
    <DivSuccess>
      <DivImg></DivImg>

      <TitleH2>Well Done</TitleH2>

      <DivCalories>
        <CaloriesP>Calories:</CaloriesP>

        <ValueCaloriesSpan>{totalCalories}</ValueCaloriesSpan>
      </DivCalories>

      <ButtonAdd onClick={onClose}>Next product</ButtonAdd>

      <DivLink href="Diary">
        <LinkText>To the diary</LinkText>

        <svg width="16" height="16">
          <use href="/src/assets/images/sprite/sprite.svg#arrow-add-prod"></use>
        </svg>
      </DivLink>
    </DivSuccess>
  );
}
