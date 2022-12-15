import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import AlertDialog from '../AlertDialog';
import FlashcardForm from './FlashcardForm';
import TextForm from './TextForm';
import VideoForm from './VideoForm';

const validationSchema = yup.object().shape({
  name: yup.string().required('Mục này không được để trống'),
  description: yup.string().required('Mục này không được để trống'),
  type: yup.string().required('Mục này không được để trống'),
  videoUrl: yup.string().when('type', {
    is: '1',
    then: yup.string().required('Mục này không được để trống'),
  }),
  text: yup.string().when('type', {
    is: '2',
    then: yup.string().required('Mục này không được để trống'),
  }),
  flashcardSetId: yup.string().when('type', {
    is: '3',
    then: yup.string().required('Mục này không được để trống'),
  }),
});

const LessonForm = ({ lesson }: any) => {
  const handleFormSubmit = (data: any) => {
    console.log(data);
  };
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<number>(0);

  const initialValues = lesson
    ? {
        name: String(lesson.name),
        description: String(lesson.description),
        type: String(lesson.type),
        videoUrl: String(lesson.videoUrl),
        text: String(lesson.text),
        flashcardSetId: String(lesson.flashcardSetId),
      }
    : {
        name: '',
        description: '',
        type: '',
        videoUrl: '',
        text: '',
        flashcardSetId: '',
      };

  useEffect(() => {
    if (lesson && lesson.type) setType(Number(lesson.type));
  }, [lesson]);

  const isValuesNotChanged = () => {
    return (
      initialValues.name === values.name &&
      initialValues.description === values.description &&
      initialValues.type === values.type &&
      initialValues.videoUrl === values.videoUrl &&
      initialValues.text === values.text &&
      initialValues.flashcardSetId === values.flashcardSetId
    );
  };

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(Number(e.target.value));
    handleChange(e);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { touched, values, handleBlur, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik({
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
        paddingBottom: '24px',
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
      <FormControl
        error={!!touched.type && !!errors.type}
        sx={{ mt: '24px', width: '400px', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Loại bài học
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.type}
          onBlur={handleBlur}
          onChange={handleTypeChange}
          name="type"
        >
          <MenuItem value={1}>Video</MenuItem>
          <MenuItem value={2}>Văn bản</MenuItem>
          <MenuItem value={3}>Flashcard</MenuItem>
        </Select>
        <FormHelperText>{!!touched.type && errors.type}</FormHelperText>
      </FormControl>

      {type === 1 && (
        <VideoForm
          touched={touched}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      )}
      {type === 2 && (
        <TextForm touched={touched} values={values} errors={errors} setFieldValue={setFieldValue} />
      )}
      {type === 3 && (
        <FlashcardForm
          touched={touched}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
          errors={errors}
        />
      )}

      <Box display="flex" justifyContent="end" gap="20px" mt="40px">
        <PrimaryButton variant="outlined" color="error" onClick={handleOpen}>
          Xoá bài này
        </PrimaryButton>
        <PrimaryButton disabled={isValuesNotChanged()} variant="contained" type="submit">
          Lưu
        </PrimaryButton>
      </Box>

      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
};

export default LessonForm;
