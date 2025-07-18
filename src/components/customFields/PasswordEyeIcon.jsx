import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import theme from 'theme';

interface IProps {
  handleOnClick: () => void;
  showPassword: boolean;
}

export default function PasswordEyeIcon(props: IProps) {
  const { handleOnClick, showPassword } = props;

  return (
    <InputAdornment position="end" sx={{ marginRight: theme.spacing(-1.5) }}>
      <IconButton onClick={handleOnClick}>
        {showPassword ? (
          <VisibilityOffIcon fontSize="small" />
        ) : (
          <VisibilityIcon fontSize="small" />
        )}
      </IconButton>
    </InputAdornment>
  );
}
