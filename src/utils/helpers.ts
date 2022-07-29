export const dateFormatter = (date: string) => {
  const feedbackDate = new Date(date);
  const formattedDate = feedbackDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return formattedDate;
};

export const phoneNumberFormatter = (phoneNumber: string) => {
  const formattedPhoneNumber =
    phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3);
  return formattedPhoneNumber;
};

export const camelCaseToUnderscoreConverter = (object: any) => {
  const newObject: any = {};
  function camelToUnderscore(key: any) {
    return key.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  for (var camel in object) {
    newObject[camelToUnderscore(camel)] = object[camel];
  }
  return newObject;
};
