import Box from '@mui/material/Box';
import { SelectChangeEvent, SxProps } from '@mui/material';
import { Formik } from 'formik';
import { useRef, useState, useMemo } from 'react';
import PrimaryButton from '../../components/common/PrimaryButton';
import Topbar from '../../components/common/Topbar';
import { colors } from '../../theme';
import * as yup from 'yup';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import CustomTextField from '../../components/common/CustomTextField';

type Props = {};

const initialValues = {
  pointsUnlock: '',
  price: '',
  discount: '',
  pointsReward: '',
  courseType: '',
  level: '',
  courseTitle: '',
  description: '',
};

const sx: SxProps = {
  mt: '24px',
};

const CourseCreatePage = (props: Props) => {
  const [courseType, setCourseType] = useState<string>('');
  const ref = useRef<HTMLInputElement>(null);

  const courseSchema = useMemo(
    () =>
      yup.object().shape({
        pointsUnlock: yup.number().when('courseType', {
          is: 'free',
          then: yup
            .number()
            .typeError('Phải nhập vào một số')
            .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
              return value !== undefined && value >= 0;
            }),
        }),
        pointsReward: yup
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
      }),
    []
  );

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

  return (
    <Box pb="20px">
      <Topbar title="Tạo khoá học" />
      <div style={{ marginTop: '20px' }}></div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={courseSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                  src="https://m.media-amazon.com/images/I/81TmH5v-g0L._RI_.jpg"
                  alt="Duck Quack Quack"
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <PrimaryButton
                onClick={triggerFileInput}
                variant="outlined"
                sx={{ ...sx, width: '100%' }}
              >
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
                  <MenuItem value={1}>Như ăn bánh</MenuItem>
                  <MenuItem value={2}>Dễ</MenuItem>
                  <MenuItem value={3}>Trung bình</MenuItem>
                  <MenuItem value={4}>Khó</MenuItem>
                  <MenuItem value={5}>Hoá hữu cơ</MenuItem>
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
                  helperText={!!touched.pointsUnlock && errors.pointsUnlock}
                  inputProps={{
                    placeholder: 'Điểm mở khoá',
                    value: values.pointsUnlock,
                    onBlur: handleBlur,
                    onChange: handleChange,
                    error: !!touched.pointsUnlock && !!errors.pointsUnlock,
                    name: 'pointsUnlock',
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
                helperText={!!touched.pointsReward && errors.pointsReward}
                inputProps={{
                  placeholder: 'Điểm thưởng hoàn thành',
                  value: values.pointsReward,
                  onBlur: handleBlur,
                  onChange: handleChange,
                  error: !!touched.pointsReward && !!errors.pointsReward,
                  name: 'pointsReward',
                }}
                sx={sx}
              />
              <CustomTextField
                label="Mô tả"
                helperText={!!touched.description && errors.description}
                inputProps={{
                  placeholder: 'Mô tả',
                  value: values.description,
                  onBlur: handleBlur,
                  onChange: handleChange,
                  error: !!touched.description && !!errors.description,
                  name: 'description',
                  rows: 3,
                  multiline: true,
                }}
                sx={sx}
              />

              <PrimaryButton variant="contained" type="submit" sx={{ mt: '40px', width: '100%' }}>
                Lưu
              </PrimaryButton>

              <input
                accept=".jpg, .png"
                type="file"
                style={{
                  display: 'none',
                }}
                ref={ref}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseCreatePage;
