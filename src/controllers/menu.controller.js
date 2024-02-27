
export class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }

    async getAllMenus(req, res) {
        const getallmenus = await this.menuService.getAllMenus();
        res.json(getallmenus);
    }

    async getMenuById(req, res) {
        const menuId = req.params.menuId;
        const getbymenu = await this.menuService.getMenuById(menuId);
        if (!getbymenu) {
            res.status(404).json({ message: '메뉴를 찾을 수 없습니다.' });
        } else {
            res.json(getbymenu);
        }
    }

    async createMenu(req, res, next) {
        const menuData = req.body;
        const newMenu = await this.menuService.createMenu(menuData);
        return res
            .status(201)
            .json({ message: "메뉴 등록에 성공하였습니다", data: newMenu });
    } catch(err) {
        next(err);
    };

    async updateMenu(req, res, next) {
        const menuId = req.params.menuId;
        const menuData = req.body;
        const updatedMenu = await this.menuService.updateMenu(menuId, menuData);
        return res.status(200).json(updatedMenu);
    } catch(err) {
        next(err);
    }


    async deleteMenu(req, res, next) {
        const menuId = req.params.menuId;
        await this.menuService.deleteMenu(menuId);
        return res.status(200).json({ message: "메뉴 삭제 완료!" });
    } catch(err) {
        next(err);
    }
}
