import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { initialSet, ISet } from 'api/exam/examInterface';
import CustomCKEditor from 'components/common/CustomCKEditor';

const validationSchema = yup.object().shape({
  title: yup.string().required('Bắt buộc nhập trường này'),
  audio: yup.string(),
  side: yup.string(),
});

interface ICustomSet extends ISet {
  side?: string;
}

interface IFormSet {
  isCreate?: boolean;
  onCreate?: (data: ICustomSet) => void;
  initialData?: ICustomSet;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormSet({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFormSet) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const axios = useAxiosPrivate(true);

  const initialValues: ICustomSet = {
    ...initialData,
    ...initialSet,
  };
  const {
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
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

  function handleFormSubmit(data: ICustomSet) {
    // if (isCreate) {
    //   createFlashcardSet(data);
    // } else if (initialData) {
    //   updateFlashcardSet({
    //     ...data,
    //     id: initialData.id,
    //   });
    // }
  }

  // async function createFlashcardSet(data: ICustomSet) {
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
          {isCreate ? 'Thêm bộ câu hỏi cho phần thi' : 'Chỉnh sửa bộ câu hỏi'}
        </Typography>
      )}
      <CustomTextField
        label="Tiêu đề"
        helperText={!!touched.title && errors.title}
        inputProps={{
          placeholder: 'Tiêu đề',
          value: values.title,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.title && !!errors.title,
          name: 'title',
        }}
      />
      <CustomTextField
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
        label="Ghi âm / âm thanh"
        helperText={!!touched.audio && errors.audio}
        inputProps={{
          placeholder: 'Ghi âm / âm thanh',
          value: values.audio,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.audio && !!errors.audio,
          name: 'audio',
        }}
      />
      {values.audio && (
        <audio
          src={values.audio}
          style={{
            marginTop: '12px',
            width: '100%',
          }}
          controls
        ></audio>
      )}

      <CustomCKEditor
        touched={touched}
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
        title="Văn bản"
        isRequired={false}
        name="side"
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
        <PrimaryButton disabled={disabled} variant="contained" type="submit" sx={{ flex: '1' }}>
          Lưu
        </PrimaryButton>
      </Box>
      {!isCreate && (
        <AlertDialog onConfirm={handleConfirmDelete} open={open} handleClose={toggle} />
      )}
    </form>
  );
}

export default FormSet;
