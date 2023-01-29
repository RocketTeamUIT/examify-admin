import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
} from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IChoice, initialChoice, initialQuestion, IQuestion } from 'api/exam/examInterface';
import { useParams } from 'react-router-dom';
import { colors } from 'theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChoiceForm from './ChoiceForm';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
  level: yup.string().not([0, '0'], 'Bắt buộc chọn trường này'),
  explain: yup.string(),
});

interface IFormSet {
  isCreate?: boolean;
  onCreate?: (data: IQuestion) => void;
  initialData?: IQuestion;
  initialChoices?: IChoice[];
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormQuestion({
  isCreate,
  onCreate,
  initialData,
  initialChoices,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFormSet) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [choices, setChoices] = useState<IChoice[]>(initialChoices ?? Array(4).fill(initialChoice));
  const axios = useAxiosPrivate(true);
  const { setId } = useParams();

  const initialValues: IQuestion = {
    ...initialData,
    ...initialQuestion,
  };
  const { touched, values, handleBlur, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  useEffect(() => {
    if (initialData) {
      resetForm({
        values: initialData,
      });
    }
  }, [initialData, resetForm]);

  function handleFormSubmit(data: IQuestion) {
    if (error) {
      return;
    }
    // if (isCreate) {
    //   createFlashcardSet(data);
    // } else if (initialData) {
    //   updateFlashcardSet({
    //     ...data,
    //     id: initialData.id,
    //   });
    // }
  }

  // async function createFlashcardSet(data: IQuestion) {
  //   try {
  //     setLoading(true);
  //     const response = await createFlashcardSetService({ axios, ...data });
  //     if (onCreate)
  //       onCreate({
  //         ...response.data.data,
  //         id: response.data.data.fc_set_id,
  //       });
  //     toast.success('Thêm bộ flashcard thành công');
  //     hide();
  //   } catch (error) {
  //     console.log('🚀 ~ file: AddFlashcardSetModal.tsx:93 ~ createFlashcardType ~ error', error);
  //     toast.error('Thêm thất bại');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateFlashcardSet(data: IUpdateFlashcardSet) {
  //   try {
  //     setLoading(true);
  //     await updateFlashcardSetService({ ...data, axios });
  //     if (onUpdate) onUpdate();
  //     toast.success('Cập nhật bộ flashcard thành công');
  //     hide();
  //   } catch (error) {
  //     toast.error('Cập nhật thất bại');
  //     console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:38 ~ handleFormSubmit ~ error', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  function isValuesNotChanged() {
    if (isCreate) {
      return JSON.stringify(initialValues) === JSON.stringify(values);
    } else if (initialData) {
      return JSON.stringify(initialData) === JSON.stringify(values);
    }
    return true;
  }

  async function handleConfirmDelete() {
    // setLoading(true);
    // try {
    //   if (initialData) {
    //     await deleteFlashcardSetService({ axios, fc_set_id: initialData.id });
    //     if (onDelete) onDelete(initialData.id);
    //     toast.success('Xoá thành công');
    //     hide();
    //   }
    // } catch (error) {
    //   console.log('🚀 ~ file: AddFlashcardTypeModal.tsx:107 ~ handleConfirmDelete ~ error', error);
    //   toast.error('Xoá thất bại');
    // } finally {
    //   setLoading(false);
    // }
  }

  function toggle() {
    setOpen((prev) => !prev);
  }

  function verify() {
    if (choices.find((item) => !item.name)) {
      setError('Phải điền hết tất cả đáp án');
      return;
    }
    if (!choices.find((item) => item.key)) {
      setError('Phải có ít nhất 1 đáp án đúng');
      return;
    }

    setError('');
  }

  const disabled = isValuesNotChanged() || loading;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '600px',
      }}
    >
      {!hideTitle && (
        <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
          {isCreate ? 'Thêm câu hỏi' : 'Chỉnh sửa câu hỏi'}
        </Typography>
      )}
      <CustomTextField
        label="Câu hỏi"
        helperText={!!touched.name && errors.name}
        inputProps={{
          placeholder: 'Câu hỏi',
          value: values.name,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.name && !!errors.name,
          name: 'name',
        }}
      />
      <FormControl
        error={!!touched.level && !!errors.level}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Mức độ
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.level}
          onBlur={handleBlur}
          onChange={handleChange}
          name="level"
        >
          <MenuItem value={0} disabled>
            Chọn
          </MenuItem>
          <MenuItem value="easy">Dễ</MenuItem>
          <MenuItem value="average">Trung bình</MenuItem>
          <MenuItem value="hard">Khó</MenuItem>
        </Select>
        <FormHelperText>{!!touched.level && errors.level}</FormHelperText>
      </FormControl>

      <label
        style={{
          fontWeight: 'bold',
          color: '#000 !important',
          marginTop: '24px',
          display: 'block',
        }}
      >
        Các câu trả lời
      </label>

      <ChoiceForm choices={choices} setChoices={setChoices} />
      <FormHelperText sx={{ color: '#D32F2F' }}>{error}</FormHelperText>

      <Divider sx={{ mt: '24px' }} />

      <CustomTextField
        label="Hashtag"
        sx={{ mt: '8px', width: '100%', display: 'flex' }}
        helperText={!!touched.hashtagId && errors.hashtagId}
        inputProps={{
          placeholder: 'Hashtag',
          value: values.hashtagId,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.hashtagId && !!errors.hashtagId,
          name: 'hashtagId',
        }}
      />
      <CustomTextField
        label="Giải thích"
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        helperText={!!touched.explain && errors.explain}
        inputProps={{
          placeholder: 'Giải thích',
          value: values.explain,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.explain && !!errors.explain,
          name: 'explain',
          multiline: true,
          rows: 3,
        }}
      />

      <Box display="flex" gap="20px" mt="40px">
        {!isCreate && (
          <PrimaryButton
            variant="outlined"
            color="error"
            sx={{
              flex: '1',
            }}
            onClick={toggle}
          >
            Xoá
          </PrimaryButton>
        )}
        <PrimaryButton
          disabled={disabled}
          variant="contained"
          type="submit"
          sx={{ flex: '1' }}
          onClick={verify}
        >
          Lưu
        </PrimaryButton>
      </Box>
      {!isCreate && (
        <AlertDialog onConfirm={handleConfirmDelete} open={open} handleClose={toggle} />
      )}
    </form>
  );
}

export default FormQuestion;
