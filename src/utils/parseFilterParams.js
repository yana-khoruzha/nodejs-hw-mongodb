export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const validTypes = ['work', 'home', 'personal'];
  const contactType = validTypes.includes(type) ? type : undefined;

  let favourite;
  if (isFavourite === 'true') favourite = true;
  if (isFavourite === 'false') favourite = false;

  return {
    type: contactType,
    isFavourite: favourite,
  };
};
