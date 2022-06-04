import campaignDummyData from '../../dummyData/campaign.data';

export default async function handler (req, res) {
    const {authorization} = req.headers;

    if(req.method === 'GET') {
        const result = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/myCampaigns`, {
        // const result = await fetch(`http://localhost:3001/myCampaigns`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            },
        });
        
        const data = await result.json();
        let campaigns = await data.campaigns;
        // if (categories.length === 0) {
            // campaigns.push(...campaignDummyData);
        // }
        res.status(200).json({
            error: false,
            message: 'Campaigns fetched successfully!',
            campaigns: campaigns.map(data => {
                return {
                    ...data,
                    tasks: data.tasks ? data.tasks : []
                }
            })
        });
        return;
    }
    res.status(401).json({
        error: true,
        message: 'Not allowed!'
    });
}