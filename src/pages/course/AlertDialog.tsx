import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface IAlertDialog {
  open: boolean;
  handleClose: () => void;
  title?: string;
}

export default function AlertDialog({ open, handleClose, title }: IAlertDialog) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ maxWidth: '100%', textAlign: 'center' }} id="alert-dialog-title">
        {title ?? 'Xác nhận xoá khỏi hệ thống'}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Huỷ</Button>
        <Button onClick={handleClose} color="error" autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
