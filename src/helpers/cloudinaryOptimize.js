export default function (img, width = '600') {
  if (!img) {
    return ''
  }
  const optimizeStr = `w_${width}/q_auto/f_auto/`
  if (img.includes('upload/')) {
    return img.replace('upload/', `upload/${optimizeStr}`)
  }
  return img.replace('gonation/', `gonation/${optimizeStr}`)
}
