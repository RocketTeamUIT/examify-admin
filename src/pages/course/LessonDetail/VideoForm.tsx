import { Typography } from '@mui/material';
import CustomTextField from 'components/common/CustomTextField';

const VideoForm = ({ touched, values, handleBlur, handleChange, errors }: any) => {
  return (
    <>
      <CustomTextField
        label="URL"
        helperText={!!touched.videoUrl && errors.videoUrl}
        sx={{
          mt: '24px',
        }}
        inputProps={{
          placeholder: 'URL',
          value: values.videoUrl,
          onBlur: handleBlur,
          onChange: handleChange,
          error: !!touched.videoUrl && !!errors.videoUrl,
          name: 'videoUrl',
        }}
      />

      <Typography fontWeight="bold" mt="24px" mb="12px">
        Xem trước
      </Typography>
      {values.videoUrl && (
        <iframe
          src={values.videoUrl}
          style={{
            display: 'block',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '8px',
          }}
          frameBorder={0}
          allowFullScreen
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </>
  );
};

export default VideoForm;
