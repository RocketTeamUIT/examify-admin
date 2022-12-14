import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
  const { touched, values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

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

      <PrimaryButton
        variant="contained"
        sx={{
          mt: '24px',
          width: '100%',
        }}
      >
        Lưu
      </PrimaryButton>
    </form>
  );
};

export default TinyForm;
