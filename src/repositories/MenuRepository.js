
export class MenuRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getAllMenus() {
        return await this.prisma.menus.findMany();
    }

    async getMenuById(menuId) {
        return await this.prisma.menus.findUnique({
            where: {
                menuId: parseInt(menuId)
            }
        });
    }

    async createMenu(menuData) {
        return await this.prisma.menus.create({
            data: menuData
        });
    }

    async updateMenu(menuId, menuData) {
        return await this.prisma.menus.update({
            where: {
                menuId: parseInt(menuId)
            },
            data: menuData
        });
    }

    async deleteMenu(menuId) {
        return await this.prisma.menus.delete({
            where: {
                menuId: parseInt(menuId)
            }
        });
    }
}
