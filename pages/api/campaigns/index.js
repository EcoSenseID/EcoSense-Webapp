export default function handler(req, res){
    if(req.method === 'GET') {
        res.status(200).json({
            error: false,
            message: 'GET /api/campaigns not allowed!'
        });
    }
    else if (req.method === 'POST') {
        const { newCampaignData } = req.body;
        const idToken = req.headers.authorization;
        console.log(newCampaignData);
        console.log(idToken);
        res.status(200).json({
            error: false,
            message: 'POST /campaigns connected!'
        });
        // Next: Connect to Backend API
    }
}