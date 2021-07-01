module.exports = {
    pagination: (params, records) => {
        const page = +params.page || 1;
        const perPage = +params.per_page || 15;
        const skip = (page - 1) * perPage;
        const limit = `${skip},${perPage}`;
        const totalItems = records[0].totalItems;
        const numPages = Math.ceil(totalItems / perPage);
        return {
            curren_page: page,
            last_page: numPages,
            per_page: perPage,
            total_items: totalItems,
            limit
        };
    }
};