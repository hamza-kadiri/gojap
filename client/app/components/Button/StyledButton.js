import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  color: white;
  && :hover {
    color: red;
  }
`;

export default StyledButton;
