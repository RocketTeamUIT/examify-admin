export const getUnitListWithChapterId = (course: any) => {
  const unitList: any[] = [];
  if (!course) return unitList;

  (course.chapterList || []).forEach((chapter: any) => {
    if (!chapter.unitList) return;
    (chapter.unitList || []).forEach((unit: any) => {
      unitList.push({
        ...unit,
        chapterId: chapter.id,
      });
    });
  });

  return unitList;
};
