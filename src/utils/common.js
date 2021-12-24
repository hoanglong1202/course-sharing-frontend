export const formatPrice = (price) => {
  return new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'đ',
  }).format(price);
};

export const validateYouTubeUrl = (url) => {
  if (url !== undefined || url !== '') {
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length === 11) {
      const validEmbedVideoUrl = `https://www.youtube.com/embed/${match[2]}`
      return validEmbedVideoUrl;
    } else {
      alert('Video URL không hợp lệ');
    }
  }
};
