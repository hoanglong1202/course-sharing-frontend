export const formatPrice = (price) => {
  return new Intl.NumberFormat('vn-VN', {
    style: 'currency',
    currency: 'đ',
  }).format(price);
};

export const validateYouTubeUrl = (url) => {
  if (url !== undefined || url !== '') {
    // eslint-disable-next-line no-useless-escape
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length === 11) {
      const validEmbedVideoUrl = `https://www.youtube.com/embed/${match[2]}`;
      return validEmbedVideoUrl;
    } else {
      return '';
    }
  }
};

export const validateFacebookUrl = (url) => {
  if (url !== undefined || url !== "") {
    // eslint-disable-next-line no-useless-escape
    let regExp = /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/;
    let match = url.match(regExp);
    if (match && match[1].length > 0) {
      let embedUrl = `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F${match[1]}%2F&width=500&show_text=false&height=300&appId`;

      return embedUrl;
    } else {
      return "";
    }
  }
};
