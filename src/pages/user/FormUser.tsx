import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import * as yup from 'yup';
import CustomTextField from 'components/common/CustomTextField';
import PrimaryButton from 'components/common/PrimaryButton';
import AlertDialog from 'pages/course/AlertDialog';
import { toast } from 'react-toastify';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { initialUser, IUser } from 'api/users/userInterface';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

interface IUserForm {
  isCreate?: boolean;
  onCreate?: (data: IUser) => void;
  initialData?: IUser;
  onUpdate?: () => void;
  onDelete?: (id: number) => void;
  hide: (data?: any) => void;
  hideTitle?: boolean;
}

interface ICustomUser extends IUser {
  role?: string;
}

function FormUser({
  isCreate,
  onCreate,
  initialData,
  onUpdate,
  onDelete,
  hide,
  hideTitle = false,
}: IUserForm) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const axios = useAxiosPrivate(true);

  const initialValues: ICustomUser = {
    ...initialUser,
    ...initialData,
    role: 'student',
  };

  const { touched, values, handleBlur, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (initialData) {
      resetForm({
        values: { ...initialData, role: 'student' },
      });
    }
  }, [initialData, resetForm]);

  function handleFormSubmit(data: ICustomUser) {
    console.log(data);
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
        <>
          <Typography variant="h5" fontWeight="bold" mb="20px" textAlign="center">
            Thay đổi quyền cho {values.first_name} {values.last_name}
          </Typography>
          <Typography sx={{ fontSize: '16px', textAlign: 'center', mt: '-16px', color: '#666' }}>
            {values.mail}
          </Typography>
        </>
      )}
      <FormControl
        error={!!touched.role && !!errors.role}
        sx={{ mt: '24px', width: '100%', display: 'flex' }}
      >
        <label
          style={{
            fontWeight: 'bold',
            color: '#000 !important',
          }}
        >
          Quyền
        </label>
        <Select
          sx={{
            mt: '3px',
          }}
          value={values.role}
          onBlur={handleBlur}
          onChange={handleChange}
          name="role"
        >
          <MenuItem value="student">Học viên</MenuItem>
          <MenuItem value="teacher">Giáo viên</MenuItem>
          <MenuItem value="teaching staff">Nhân viên giảng dạy</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

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

export default FormUser;
