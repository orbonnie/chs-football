const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function cloudinaryImage(path: string, size = 600) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${size},h_${Math.round(size * 1.25)},c_fill,g_face/${path}`;
}

export function cloudinaryUrl(path: string) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto/${path}`;
}

export function cloudinaryLoader({ src, width, quality }: {
  src: string; width: number; quality?: number;
}) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${quality ?? "auto"},w_${width},c_limit/${src}`;
}

export function cloudinaryPlayerLoader({ src, width, quality }: {
  src: string; width: number; quality?: number;
}) {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${quality ?? "auto"},w_${width},h_${Math.round(width * 1.25)},c_fill,g_face/${src}`;
}
