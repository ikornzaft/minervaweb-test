import { v4 as uuidv4 } from 'uuid';

const CreateFileName = (type, name) => {
  const randomId = uuidv4();
  const today = new Date();
  let fileName = '';
  let fileRoute = '';
  const year = today.getFullYear().toString();
  const month = today.getMonth() + 1;
  const date = year + month.toString().padStart(2, '0');

  if (type === 'application/pdf') {
    fileName = date + '/' + randomId + '.pdf';
    fileRoute = 'documentupload';
  }
  if (type.substring(0, 5) === 'image') {
    const splitedName = name.toLowerCase().split('.');
    const extension = splitedName[splitedName.length - 1];

    fileName = date + '/' + randomId + '.' + extension;
    fileRoute = 'imageupload';
  }
  if (type.substring(0, 5) === 'video') {
    const splitedName = name.toLowerCase().split('.');
    const extension = splitedName[splitedName.length - 1];

    fileName = date + '/' + randomId + '.' + extension;
    fileRoute = 'videoupload';
  }
  if (type.substring(0, 5) === 'audio') {
    const splitedName = name.toLowerCase().split('.');
    const extension = splitedName[splitedName.length - 1];

    fileName = date + '/' + randomId + '.' + extension;
    fileRoute = 'audioupload';
  }

  return { fileName, fileRoute };
};

export { CreateFileName };
