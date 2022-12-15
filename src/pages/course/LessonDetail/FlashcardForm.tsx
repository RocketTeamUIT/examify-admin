import CustomTextField from 'components/common/CustomTextField';

const FlashcardForm = ({ touched, values, handleBlur, handleChange, errors }: any) => {
  return (
    <CustomTextField
      label="ID Bộ Flashcard"
      sx={{ mt: '24px' }}
      helperText={!!touched.flashcardSetId && errors.flashcardSetId}
      inputProps={{
        placeholder: 'ID Bộ Flashcard',
        value: values.flashcardSetId,
        onBlur: handleBlur,
        onChange: handleChange,
        error: !!touched.flashcardSetId && !!errors.flashcardSetId,
        name: 'flashcardSetId',
      }}
    />
  );
};

export default FlashcardForm;
