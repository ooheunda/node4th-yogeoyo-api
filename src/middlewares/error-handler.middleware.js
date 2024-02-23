export default (err, req, res, next) => {
  return res
    .status(500)
    .json({ errorMessage: "서버 내부 에러가 발생했습니다." });
};
