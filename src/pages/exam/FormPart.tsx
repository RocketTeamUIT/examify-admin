import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { IPart } from 'api/exam/examInterface';

const validationSchema = yup.object().shape({
  name: yup.string().required('Bắt buộc nhập trường này'),
});

interface IFlashcardSetModal {
  isCreate?: boolean;
  onCreate?: (data: IPart) => void;
  initialData?: IPart;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

function FormPart({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IFlashcardSetModal) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const axios = useAxiosPrivate(true);

  const initialValues: IPart = initialData ?? {
    name: '',
    examId: -1,
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

  function handleFormSubmit(data: IPart) {
    // if (isCreate) {
    //   createFlashcardSet(data);
    // } else if (initialData) {
    //   updateFlashcardSet({
    //     ...data,
    //     id: initialData.id,
    //   });
    // }
  }

  // async function createFlashcardSet(data: IPart) {
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
          {isCreate ? 'Thêm phần thi mới cho đề thi' : 'Chỉnh sửa phần thi'}
        </Typography>
      )}
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

export default FormPart;
