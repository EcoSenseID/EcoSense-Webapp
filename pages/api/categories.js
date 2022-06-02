import categoriesListData from "../../dummyData/categories.data";

export default async function handler (req, res) {
    const {authorization} = req.headers;

    if(req.method === 'GET') {
        const result = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/allCategories`, {
        // const result = await fetch(`http://localhost:3001/allCategories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
        });
        const data = await result.json();
        // console.log(data);
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