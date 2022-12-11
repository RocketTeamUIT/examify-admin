import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import { useRef } from 'react';
import PrimaryButton from '../../components/common/PrimaryButton';
import Topbar from '../../components/common/Topbar';
import { colors } from '../../theme';
import * as yup from 'yup';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

type Props = {};

const initialValues = {
  pointsUnlock: '',
  pointsReward: '',
  courseType: '',
  level: '',
  courseTitle: '',
  description: '',
};

const courseSchema = yup.object().shape({
  pointsUnlock: yup
    .number()
    .typeError('Phải nhập vào một số')
    .required('Mục này không được để trống')
    .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
      return value !== undefined && value >= 0;
    }),
  pointsReward: yup
    .number()
    .typeError('Phải nhập vào một số')
    .required('Mục này không được để trống')
    .test('Is Positive?', 'Cần nhập vào số không âm', (value?: number) => {
      return value !== undefined && value >= 0;
    }),
  courseType: yup.string().required('Mục này không được để trống'),
  level: yup.string().required('Mục này không được để trống'),
  courseTitle: yup.string().required('Mục này không được để trống'),
  description: yup.string().required('Mục này không được để trống'),
});

const CourseCreatePage = (props: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    ref.current && ref.current.click();
  };

  const handleFormSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <Box pb="20px">
      <Topbar title="Tạo khoá học" />

      <div
        style={{
          marginTop: '20px',
        }}
      ></div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={courseSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* Image */}
                <Box
                  border="solid 1px"
                  borderColor={colors.grey.light}
                  width="100%"
                  borderRadius="10px"
                  overflow="hidden"
                  sx={{
                    aspectRatio: '1',
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
                  sx={{
                    width: '100%',
                    mt: '20px',
                  }}
                >
                  Thêm ảnh
                </PrimaryButton>

                {/* Input list */}
                <FormControl
                  error={!!touched.courseType && !!errors.courseType}
                  fullWidth
                  sx={{
                    mt: '24px',
                  }}
                >
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
                    onChange={handleChange}
                    name="courseType"
                    placeholder="Loại khoá học"
                  >
                    <MenuItem value="free">Miễn phí</MenuItem>
                    <MenuItem value="paid">Trả phí</MenuItem>
                  </Select>
                  <FormHelperText>{!!touched.courseType && errors.courseType}</FormHelperText>
                </FormControl>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    mt: '16px',
                  }}
                >
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      marginTop: '-16px',
                      color: '#000 !important',
                    }}
                  >
                    Điểm mở khoá
                  </InputLabel>
                  <TextField
                    sx={{
                      mt: '32px',
                    }}
                    placeholder="Điểm mở khoá"
                    value={values.pointsUnlock}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.pointsUnlock && !!errors.pointsUnlock}
                    helperText={!!touched.pointsUnlock && errors.pointsUnlock}
                    name="pointsUnlock"
                    fullWidth
                  />
                </FormControl>
                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    mt: '16px',
                  }}
                >
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      marginTop: '-16px',
                      color: '#000 !important',
                    }}
                  >
                    Điểm thưởng hoàn thành
                  </InputLabel>
                  <TextField
                    sx={{
                      mt: '32px',
                    }}
                    value={values.pointsReward}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="pointsReward"
                    error={!!touched.pointsReward && !!errors.pointsReward}
                    helperText={!!touched.pointsReward && errors.pointsReward}
                    placeholder="Điểm thưởng hoàn thành"
                    fullWidth
                  />
                </FormControl>
              </Grid>

              <Grid item xs={8} display="flex" flexDirection="column">
                <FormControl fullWidth error={!!touched.level && !!errors.level}>
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

                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    mt: '28px',
                  }}
                >
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      marginTop: '-16px',
                      color: '#000 !important',
                    }}
                  >
                    Tên khoá học
                  </InputLabel>
                  <TextField
                    sx={{
                      mt: '32px',
                    }}
                    value={values.courseTitle}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="courseTitle"
                    error={!!touched.courseTitle && !!errors.courseTitle}
                    helperText={!!touched.courseTitle && errors.courseTitle}
                    placeholder="Tên khoá học"
                    rows={3}
                    multiline
                    fullWidth
                  />
                </FormControl>

                <FormControl
                  variant="standard"
                  fullWidth
                  sx={{
                    mt: '28px',
                  }}
                >
                  <InputLabel
                    sx={{
                      fontWeight: 'bold',
                      marginTop: '-16px',
                      color: '#000 !important',
                    }}
                  >
                    Mô tả
                  </InputLabel>
                  <TextField
                    sx={{
                      mt: '32px',
                    }}
                    value={values.description}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={!!touched.description && errors.description}
                    placeholder="Thêm mô tả"
                    rows={3}
                    multiline
                    fullWidth
                  />
                </FormControl>

                <PrimaryButton
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 'auto',
                    ml: 'auto',
                  }}
                >
                  Lưu
                </PrimaryButton>
              </Grid>
            </Grid>

            <input
              accept=".jpg, .png"
              type="file"
              style={{
                display: 'none',
              }}
              ref={ref}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CourseCreatePage;
