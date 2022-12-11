import Button from '@mui/material/Button/Button';
import { colors } from '../../theme';
import { styled, experimental_sx as sx } from '@mui/system';

const PrimaryButton = styled(Button)(({ variant }) =>
  sx({
    color: variant === 'contained' ? '#fff' : undefined,
    bgcolor: variant === 'contained' ? colors.primary[500] : undefined,
    textTransform: 'none',
    borderRadius: '6px',
    width: '144px',
    height: '44px',
    fontWeight: '600',
  })
);

export default PrimaryButton;
