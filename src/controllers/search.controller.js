export class SearchController {
  constructor(searchService) {
    this.serachService = searchService;
  }

  getSearchDatas = async (req, res, next) => {
    try {
      const { searchStr, filter } = req.query;

      const searchDatas = await this.serachService.getSearchDatas(
        searchStr,
        filter || "all"
      );

      return res.status(200).json({ data: searchDatas });
    } catch (err) {
      next(err);
    }
  };
}
