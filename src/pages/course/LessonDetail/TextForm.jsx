import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, FormHelperText } from '@mui/material';

const TextForm = ({ touched, values, errors, setFieldValue }) => {
  return (
    <Box
      mt="24px"
      sx={{
        '& .ck-rounded-corners': {
          border: !!touched.text && !!errors.text && '1px solid #d32f2f',
        },
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={values.text}
        onChange={(_, editor) => {
          const data = editor.getData();
          setFieldValue('text', data);
        }}
      />
      <FormHelperText
        sx={{
          color: '#d32f2f',
        }}
      >
        {!!touched.text && errors.text}
      </FormHelperText>
    </Box>
  );
};

export default TextForm;
