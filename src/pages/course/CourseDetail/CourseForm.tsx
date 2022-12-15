import Box from '@mui/material/Box';
import { SelectChangeEvent, SxProps } from '@mui/material';
import { Formik, useFormik } from 'formik';
import { useRef, useState, useMemo, useEffect } from 'react';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { colors } from '../../../theme';
import * as yup from 'yup';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import CustomTextField from '../../../components/common/CustomTextField';
import AlertDialog from '../AlertDialog';
import CourseCKEditor from '../CourseCKEditor';

const sx: SxProps = {
  mt: '24px',
};

const CourseForm = ({ course }: any) => {
  const [courseType, setCourseType] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const {
    pointToUnlock,
    price,
    discount,
    charges,
    pointReward,
    level,
    name,
    description,
    achieves,
    image,
  } = course;

  const initialValues = {
    pointToUnlock: String(pointToUnlock),
    price: String(price),
    discount: String(discount),
    pointReward: String(pointReward),
    courseType: charges ? 'paid' : 'free',
    level: String(level),
    courseTitle: String(name),
    description: String(description),
    achieves: String(achieves),
    image: String(image),
  };

  useEffect(() => {
    setCourseType(String(charges ? 'paid' : 'free'));
  }, [charges]);

  const isValueNotChanged = () => {
    return (
      initialValues.pointToUnlock === values.pointToUnlock &&
      initialValues.price === values.price &&
      initialValues.discount === values.discount &&
      initialValues.pointReward === values.pointReward &&
      initialValues.courseType === values.courseType &&
      initialValues.level === values.level &&
      initialValues.description === values.description &&
      initialValues.achieves === values.achieves &&
      initialValues.courseTitle === values.courseTitle
    );
  };

  const courseSchema = useMemo(
    () =>
      yup.object().shape({
        pointToUnlock: yup.number().when('courseType', {
          is: 'free',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
              return value !== undefined && value >= 0;
            }),
        }),
        pointReward: yup
          .number()
          .typeError('Phải nhập vào một số')
          .required('Mục này không được để trống')
          .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
            return value !== undefined && value >= 0;
          }),
        price: yup.number().when('courseType', {
          is: 'paid',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
              return value !== undefined && value >= 0;
            }),
        }),
        discount: yup.number().when('courseType', {
          is: 'paid',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào giá trị hợp lệ', (value?: number) => {
              return value !== undefined && value >= 0 && value <= 100;
            }),
        }),
        courseType: yup.string().required('Mục này không được để trống'),
        level: yup.string().required('Mục này không được để trống'),
        courseTitle: yup.string().required('Mục này không được để trống'),
        description: yup.string().required('Mục này không được để trống'),
        achieves: yup.string().required('Mục này không được để trống'),
        image: yup.string().required('Mục này không được để trống'),
      }),
    []
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const triggerFileInput = () => {
    ref.current && ref.current.click();
  };

  const handleFormSubmit = (data: Object) => {
    console.log(data);
  };

  const handleTypeChange = (e: SelectChangeEvent<string>, fn: any) => {
    setCourseType(e.target.value);
    fn(e);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: courseSchema,
    });

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth="600px"
        position="relative"
        left="50%"
        sx={{
          transform: 'translateX(-50%)',
        }}
      >
        {/* Image */}
        <Box
          border="solid 1px"
          borderColor={colors.grey.light}
          width="100%"
          borderRadius="10px"
          overflow="hidden"
          sx={{
            aspectRatio: '3/2',
          }}
        >
          <img
            src={values.image}
            alt={values.courseTitle}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <PrimaryButton onClick={triggerFileInput} variant="outlined" sx={{ ...sx, width: '100%' }}>
          Thêm ảnh
        </PrimaryButton>

        {/* Input list */}
        <CustomTextField
          label="Tên khoá học"
          helperText={!!touched.courseTitle && errors.courseTitle}
          inputProps={{
            placeholder: 'Tên khoá học',
            value: values.courseTitle,
            onBlur: handleBlur,
            onChange: handleChange,
            error: !!touched.courseTitle && !!errors.courseTitle,
            name: 'courseTitle',
          }}
          sx={sx}
        />

        <FormControl fullWidth error={!!touched.level && !!errors.level} sx={sx}>
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
            <MenuItem value="basic">Cơ bản</MenuItem>
            <MenuItem value="general">Trung bình</MenuItem>
            <MenuItem value="advance">Nâng cao</MenuItem>
          </Select>
          <FormHelperText>{!!touched.level && errors.level}</FormHelperText>
        </FormControl>
        <FormControl error={!!touched.courseType && !!errors.courseType} fullWidth sx={sx}>
          <label
            style={{
              fontWeight: 'bold',
              color: '#000 !important',
            }}
          >
            Loại khoá học
          </label>
          <Select
            sx={{
              mt: '3px',
            }}
            value={values.courseType}
            onBlur={handleBlur}
            onChange={(e) => handleTypeChange(e, handleChange)}
            name="courseType"
            placeholder="Loại khoá học"
          >
            <MenuItem value="free">Miễn phí</MenuItem>
            <MenuItem value="paid">Trả phí</MenuItem>
          </Select>
          <FormHelperText>{!!touched.courseType && errors.courseType}</FormHelperText>
        </FormControl>
        {courseType === 'free' && (
          <CustomTextField
            label="Điểm mở khoá"
            helperText={!!touched.pointToUnlock && errors.pointToUnlock}
            inputProps={{
              placeholder: 'Điểm mở khoá',
              value: values.pointToUnlock,
              onBlur: handleBlur,
              onChange: handleChange,
              error: !!touched.pointToUnlock && !!errors.pointToUnlock,
              name: 'pointToUnlock',
            }}
            sx={sx}
          />
        )}
        {courseType === 'paid' && (
          <>
            <CustomTextField
              label="Giá"
              helperText={!!touched.price && errors.price}
              inputProps={{
                placeholder: 'Giá',
                value: values.price,
                onBlur: handleBlur,
                onChange: handleChange,
                error: !!touched.price && !!errors.price,
                name: 'price',
              }}
              sx={sx}
            />
            <CustomTextField
              label="Giảm giá %"
              helperText={!!touched.discount && errors.discount}
              inputProps={{
                placeholder: 'Giảm giá',
                value: values.discount,
                onBlur: handleBlur,
                onChange: handleChange,
                error: !!touched.discount && !!errors.discount,
                name: 'discount',
              }}
              sx={sx}
            />
          </>
        )}

        <CustomTextField
          label="Điểm thưởng hoàn thành"
          helperText={!!touched.pointReward && errors.pointReward}
          inputProps={{
            placeholder: 'Điểm thưởng hoàn thành',
            value: values.pointReward,
            onBlur: handleBlur,
            onChange: handleChange,
            error: !!touched.pointReward && !!errors.pointReward,
            name: 'pointReward',
          }}
          sx={sx}
        />
        <CourseCKEditor
          touched={touched}
          values={values}
          errors={errors}
          setFieldValue={setFieldValue}
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
            Xoá khoá học này
          </PrimaryButton>
          <PrimaryButton
            disabled={isValueNotChanged()}
            variant="contained"
            type="submit"
            sx={{ flex: '1' }}
          >
            Lưu
          </PrimaryButton>
        </Box>

        <input
          accept=".jpg, .png"
          type="file"
          style={{
            display: 'none',
          }}
          ref={ref}
        />
      </Box>

      <AlertDialog open={open} handleClose={handleClose} />
    </form>
  );
};

export default CourseForm;
