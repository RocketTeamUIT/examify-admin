import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { useFormik } from 'formik';
import * as yup from 'yup';

const initialValues = {
  name: '',
  description: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Mục này không được để trống'),
  description: yup.string().required('Mục này không được để trống'),
});

interface ILessonForm {
  handleFormSubmit: () => void;
}

const LessonForm = ({ handleFormSubmit }: ILessonForm) => {
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
        maxWidth: '1000px',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
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
      <CustomTextField
        label="Mô tả"
        helperText={!!touched.description && errors.description}
        sx={{ mt: '24px' }}
        inputProps={{
          placeholder: 'Mô tả',
          multiline: true,
          rows: 3,
          value: values.description,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.description && !!errors.description,
          name: 'description',
        }}
      />

      <PrimaryButton
        variant="contained"
        sx={{
          mt: '24px',
          float: 'right',
        }}
      >
        Lưu
      </PrimaryButton>
    </form>
  );
};

export default LessonForm;
