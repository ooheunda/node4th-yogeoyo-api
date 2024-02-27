import { ValidationError, NotFoundError } from "../utils/common.error.js";

export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  // 음식점 목록 조회
  findAllStores = async (req, res, next) => {
    try {
      const orderKey = req.query.orderKey ?? "storeId";
      const orderValue = req.query.orderValue ?? "desc";

      if (!["storeId", "status"].includes(orderKey)) {
        throw new ValidationError("orderKey가 올바르지 않습니다.");
      }
      if (!["asc", "desc"].includes(orderValue.toLowerCase())) {
        throw new ValidationError("orderValue가 올바르지 않습니다.");
      }

      findAllSortedStores();

      const stores = await storesService.findAllStores({
        orderKey,
        orderValue: orderValue.toLowerCase(),
      });

      return res.status(200).json({ data: stores });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 상세 조회
  findOneStore = async (req, res, next) => {
    try {
      const storeId = req.params.storeId;

      const store = await storesService.findOneStore(storeId);

      return res.status(200).json({ data: store });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 생성
  createStore = async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const { name, address, category, status } = req.body;
      const userId = authMiddleware.userId;

      if (!name) {
        throw new ValidationError("음식점 이름은 필수값입니다.");
      }
      if (!address) {
        throw new ValidationError("음식점 주소는 필수값입니다.");
      }
      if (!category) {
        throw new ValidationError("업종 카테고리는 필수값입니다.");
      }

      await storesService.createStore(
        storeId,
        { name, address, category, status },
        userId
      );

      return res
        .status(201)
        .json({ message: "음식점 생성이 완료되었습니다.", data: { storeId } });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 수정
  updateStore = async (req, res, next) => {
    try {
      const storeId = req.params.storeId;
      const { name, address, category, status } = req.body;
      const userId = authMiddleware.userId;

      if (!storeId) {
        throw new NotFoundError("수정할 음식점이 존재하지 않습니다.");
      }
      if (!name && !address && !category) {
        throw new ValidationError("수정할 정보가 존재하지 않습니다.");
      }

      await storesService.updateStore(
        storeId,
        { name, address, category, status },
        userId
      );

      return res.status(201).json({ data: updateStore });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 삭제
  deleteStore = async (req, res, next) => {
    try {
      const userId = authMiddleware.userId;
      const storeId = req.params.storeId;
      const { password } = req.body;

      await storesService.deleteStore(storeId, userId, password);

      return res.status(201).json({ data: deleteStore });
    } catch (err) {
      next(err);
    }
  };
}
