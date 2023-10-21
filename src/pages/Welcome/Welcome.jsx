// import { Link } from 'react-router-dom';
import { ROUTER } from '../../utils/constants';
import {
  Button,
  ButtonWrapper,
  Container,
  Span,
  Title,
} from './Welcome.styled';

export default function Welcome() {
  return (
    <Container>
      <Title>
        Transforming your <Span>body</Span> shape with Power Pulse
      </Title>
      <ButtonWrapper>
        <Button to={ROUTER.SIGN_UP}>Sign Up</Button>
        <Button to={ROUTER.SIGN_IN}>Sign In</Button>
      </ButtonWrapper>
    </Container>
  );
}
