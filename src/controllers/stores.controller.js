export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  // 음식점 목록 조회
  findAllStores = async (req, res, next) => {
    const orderKey = req.query.orderKey ?? "storeId";
    const orderValue = req.query.orderValue ?? "desc";

    if (!["storeId", "status"].includes(orderKey)) {
      return res.status(400).json({ message: "orderKey가 올바르지 않습니다." });
    }
    if (!["asc", "desc"].includes(orderValue.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "orderValue가 올바르지 않습니다." });
    }

    findAllSortedStores();

    const stores = await storesService.findAllStores({
      orderKey,
      orderValue: orderValue.toLowerCase(),
    });

    return res.status(200).json({ data: stores });
  };

  // 음식점 상세 조회
  findOneStore = async (req, res, next) => {
    const storeId = req.params.storeId;

    if (!storeId) {
      return res.status(400).json({ message: "storeId는 필수값입니다." });
    }

    const store = await storesService.findOneStore(storeId);

    return res.status(200).json({ data: store });
  };

  // 음식점 생성
  createStore = async (req, res, next) => {
    const { name, address, category } = req.body;

    if (!name) {
      return res.status(400).json({ message: "음식점 이름은 필수값입니다." });
    }
    if (!address) {
      return res.status(400).json({ message: "음식점 주소는 필수값입니다." });
    }
    if (!category) {
      return res.status(400).json({ message: "업종 카테고리는 필수값입니다." });
    }

    await storesService.createStore({
      name,
      address,
      category,
    });

    return res
      .status(201)
      .json({ message: "음식점 생성이 완료되었습니다.", data: { storeId } });
  };

  // 음식점 수정
  updateStore = async (req, res, next) => {
    const { storeId } = req.params.storeId;
    const { name, address, category } = req.body;

    if (!storeId) {
      return res.status(400).json({
        message: "수정할 음식점이 존재하지 않습니다.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "음식점 이름은 필수값입니다.",
      });
    }
    if (!address) {
      return res.status(400).json({ message: "음식점 주소는 필수값입니다." });
    }
    if (!category) {
      return res.status(400).json({ message: "업종 카테고리는 필수값입니다." });
    }

    await storesService.updateStore(storeId, { name, address }, userId);

    return res.status(201).json({ data: updateStore });
  };

  // 음식점 삭제
  deleteStore = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { storeId } = req.params.storeId;

    await storesService.deleteStore(storeId, byUser);

    return res.status(201).json({ data: deleteStore });
  };
}
