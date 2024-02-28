
export class MenuService {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;

    }
    async getAllMenus() {
        return await this.menuRepository.getAllMenus();
    }

    async getMenuById(menuId) {
        return await this.menuRepository.getMenuById(menuId);
    }

    async createMenu(storeId,
        stock,
        status,
        price,
        name,
        image,
        category) {
        return await this.menuRepository.createMenu(storeId,
            stock,
            status,
            price,
            name,
            image,
            category);
    }

    async updateMenu(menuId, stock,
        status,
        price,
        name,
        image,
        category) {
        return await this.menuRepository.updateMenu(menuId, stock,
            status,
            price,
            name,
            image,
            category);
    }

    async deleteMenu(menuId) {
        return await this.menuRepository.deleteMenu(menuId);
    }
}