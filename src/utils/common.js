export const formatPrice = (price) => {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "đ",
  }).format(price);
};
