import { IMAGE_DIMENSION_LIMIT } from "../constants/config";

export const createImageElement = (img? : HTMLImageElement) => {
  return img ? img :new Image();
}

export const getImageFormat = (width:number , height:number) => {
  let format:string = "";
  const ratio = width / height;
  const limit = IMAGE_DIMENSION_LIMIT;
  if (width < limit && height < limit) {
    format = "max-h-96 object-cover";
  } else if (width < limit && height >= limit) {
    format = "h-96 max-w-96 object-cover";
  } else if (width >= limit && height < limit) {
      format = "max-w-96 h-full object-cover";
  } else {
    if (ratio <=  0.6) {
      format = "h-full object-cover";
    } else {
      format = "max-w-96 h-full object-cover";
    }
  }
  return format;
}