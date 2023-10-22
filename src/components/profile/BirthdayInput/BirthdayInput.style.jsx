import styled from '@emotion/styled';

export const WrapperCalendarInput = styled.div`
  position: relative;
  width: 161px;
  height: 52px;
  border-radius: 12px;
  padding: 14px 14px;
  border: 1px solid rgba(239, 237, 232, 0.3);

  @media screen and (min-width: 768px) {
    width: 187px;
  }

  .calendar-svg {
    width: 18px;
    height: 18px;
    stroke: #efede8;
  }

  .calendar-input-text {
    color: #efede8;
    font-size: 16px;
    line-height: 1.5;
  }
`;