import prisma from "../../config/prisma";

const getAllMenuItems = async () => {
    return prisma.menu_item.findmany({
        orderby: { created_at: "desc" }
    });
};

console.log(getAllMenuItems);