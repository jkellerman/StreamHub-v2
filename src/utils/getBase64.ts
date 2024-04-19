import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (imageUrl: string) => {
  const buffer = await fetch(imageUrl).then(async (res) => Buffer.from(await res.arrayBuffer()));

  const { base64 } = await getPlaiceholder(buffer);

  return base64;
};

export const getBlurredDataUrls = async (images: string[]) => {
  const base64Promises = images.map((image) => getBase64(image));

  const base64Results = await Promise.all(base64Promises);

  const imagesWithBlur = images.map((image, i) => {
    image = base64Results[i];
    return image;
  });

  return imagesWithBlur;
};
