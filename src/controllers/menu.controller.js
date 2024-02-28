
import { ValidationError } from "../utils/common.error.js";
import { menuValidation } from "../utils/validationSchema.js";

export class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }

    // 메뉴 전체조회
    async getAllMenus(req, res) {
        const getallmenus = await this.menuService.getAllMenus();
        res.json(getallmenus);
    }

    // 메뉴 상세조회
    async getMenuById(req, res) {
        const menuId = req.params.menuId;
        const getbymenu = await this.menuService.getMenuById(menuId);
        if (!getbymenu) {
            res.status(404).json({ message: '메뉴를 찾을 수 없습니다.' });
        } else {
            res.json(getbymenu);
        }
    }

    // 메뉴생성
    async createMenu(req, res, next) {
        try {
            const {
                menuData,
            } = await menuValidation.menuSchema.validateAsync(req.body);

            const newMenu = await this.menuService.createMenu(menuData);
            return res
                .status(201)
                .json({ message: "메뉴 등록에 성공하였습니다", data: newMenu });
        } catch (err) {
            next(err);
        };
    }

    // 메뉴수정
    async updateMenu(req, res, next) {
        try {
            const menuId = req.params.menuId;
            const {
                menuData,
            } = await menuValidation.menuSchema.validateAsync(req.body);

            const updatedMenu = await this.menuService.updateMenu(menuId, menuData);
            return res.status(200).json(updatedMenu);
        }
        catch (err) {
            next(err);
        }
    }

    // 메뉴삭제
    async deleteMenu(req, res, next) {
        try {
            const menuId = req.params.menuId;

            if (!userHasDeletePermission(req.user, menuId)) {
                throw new Error('권한이 없습니다.');
            }

            await this.menuService.deleteMenu(menuId);
            return res.status(200).json({ message: "메뉴 삭제 완료!" });
        } catch (err) {
            next(err);
        }
    }
}
