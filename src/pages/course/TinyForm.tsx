import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box } from '@mui/system';
import AlertDialog from './AlertDialog';
import { useState } from 'react';

const initialValues = {
  name: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
});

interface ITinyForm {
  handleFormSubmit: (values: any) => void;
  title?: string;
}

const TinyForm = ({ handleFormSubmit, title }: ITinyForm) => {
  const [open, setOpen] = useState<boolean>(false);
  const { touched, values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '600px',
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
        {title}
      </Typography>
      <CustomTextField
        label="Tên"
        helperText={!!touched.name && errors.name}
        inputProps={{
          placeholder: 'Tên',
          value: values.name,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.name && !!errors.name,
          name: 'name',
        }}
      />

      <Box display="flex" gap="20px" mt="40px">
        <PrimaryButton
          variant="outlined"
          color="error"
          sx={{
            flex: '1',
          }}
          onClick={handleOpen}
        >
          Xoá
        </PrimaryButton>
        <PrimaryButton variant="contained" type="submit" sx={{ flex: '1' }}>
          Lưu
        </PrimaryButton>
      </Box>
      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
};

export default TinyForm;
