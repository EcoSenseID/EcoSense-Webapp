// import campaignDummyData from '../../dummyData/campaign.data';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    error: boolean,
    message: string,
    campaigns?: Array<any>
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const {authorization} = req.headers;

    if(req.method === 'GET') {
        try {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Authorization', authorization!);

            const result = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/myCampaigns`, {
            // const result = await fetch(`http://localhost:3001/myCampaigns`, {
                method: 'GET',
                headers: requestHeaders,
            });
            
            const data = await result.json();
            if (!data.error) {
                let campaigns = await data.campaigns;
                // if (categories.length === 0) {
                    // campaigns.push(...campaignDummyData);
                // }
                res.status(200).json({
                    error: false,
                    message: 'Campaigns fetched successfully!',
                    campaigns: campaigns.map((data: any) => {
                        return {
                            ...data,
                            tasks: data.tasks ? data.tasks : []
                        }
                    })
                });
                return;
            } else {
                res.status(401).json({
                    error: true,
                    message: data.message || 'Fetching campaigns failed!'
                });
            }
        }
        catch (error: any) {
            res.status(401).json({
                error: true,
                message: error.message || 'Fetching campaigns failed!'
            });
        }
    } else {
        res.status(401).json({
            error: true,
            message: 'Not allowed!'
        });
    }
}