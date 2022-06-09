// import categoriesListData from "../../dummyData/categories.data";
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    error: boolean,
    message: string,
    categoriesList?: Array<any>,
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const {authorization} = req.headers;

    if(req.method === 'GET') {
        try {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Authorization', authorization!);

            const result = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/allCategories`, {
            // const result = await fetch(`http://localhost:3001/allCategories`, {
                method: 'GET',
                headers: requestHeaders,
            });
            const data = await result.json();
            // console.log(data);
            if (!data.error) {
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
            } else {
                res.status(401).json({
                    error: true,
                    message: data.message || 'Fetching categories failed!'
                });
            }
        }
        catch (error: any) {
            res.status(401).json({
                error: true,
                message: error.message || 'Fetching categories failed!'
            });
        }
    }
    else {
        res.status(401).json({
            error: true,
            message: 'Not allowed!'
        });
    }
}