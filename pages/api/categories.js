import categoriesListData from "../../dummyData/categories.data";

export default async function handler (req, res) {
    const {authorization} = req.headers;

    if(req.method === 'GET') {
        const result = await fetch(`https://ecosense-rest-api.herokuapp.com/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
        });
        const data = await result.json();
        let categories = await data.categories;
        // if (categories.length === 0) {
        //     categories.push(...categoriesListData);
        // }
        res.status(200).json({
            error: false,
            message: 'Categories fetched successfully!',
            categoriesList: categories
        });
        return;
    }
    res.status(401).json({
        error: true,
        message: 'Not allowed!'
    });
}