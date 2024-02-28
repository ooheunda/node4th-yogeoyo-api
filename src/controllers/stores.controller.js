import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/common.error.js";

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

      const stores = await this.storesService.findAllSortedStores({
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

      const store = await this.storesService.findOneStore(storeId);

      return res.status(200).json({ data: store });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 생성
  createStore = async (req, res, next) => {
    try {
      const { name, address, category, status } = req.body;
      const { userId } = req.user;

      if (req.user.role !== "owner")
        throw new UnauthorizedError("음식점 생성 권한이 없습니다.");

      if (!name) {
        throw new ValidationError("음식점 이름은 필수값입니다.");
      }
      if (!address) {
        throw new ValidationError("음식점 주소는 필수값입니다.");
      }
      if (!category) {
        throw new ValidationError("업종 카테고리는 필수값입니다.");
      }
      if (!status) {
        throw new ValidationError("음식점 상태는 필수값입니다.");
      }

      const createdStore = await this.storesService.createStore(
        userId,
        name,
        address,
        category,
        status
      );

      return res.status(201).json({
        message: "음식점 생성이 완료되었습니다.",
        data: createdStore,
      });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 수정
  updateStore = async (req, res, next) => {
    try {
      const { name, address, category, status } = req.body;
      const { userId } = req.user;

      if (!name && !address && !category && !status) {
        throw new ValidationError("수정할 정보가 존재하지 않습니다.");
      }

      const updatedStore = await this.storesService.updateStore(
        userId,
        name,
        address,
        category,
        status
      );

      return res.status(200).json({
        message: "음식점 수정이 완료되었습니다.",
        data: updatedStore,
      });
    } catch (err) {
      next(err);
    }
  };

  // 음식점 삭제
  deleteStore = async (req, res, next) => {
    try {
      const { password } = req.body;

      await this.storesService.deleteStore(req.user, password);

      return res.status(201).json({ message: "음식점 삭제가 완료되었습니다." });
    } catch (err) {
      next(err);
    }
  };
}
