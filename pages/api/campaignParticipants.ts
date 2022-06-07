import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    error: boolean,
    message: string,
    participants?: Array<any>
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    const { authorization } = req.headers;
    const { campaignId } = req.query;

    if(req.method === 'GET') {
        try {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('Authorization', authorization!);

            const result = await fetch(`https://ecosense-bangkit.uc.r.appspot.com/campaignParticipants?campaignId=${campaignId}`, {
            // const result = await fetch(`http://localhost:3001/campaignParticipants?campaignId=${campaignId}`, {
                method: 'GET',
                headers: requestHeaders,
            });
            
            const data = await result.json();
            let participants = await data.participants;
    
            res.status(200).json({
                error: false,
                message: 'Campaign participants data fetched successfully!',
                participants: participants
            });
            return;
        }
        catch (error: any) {
            res.status(400).json({
                error: true,
                message: error.message || 'Campaign participants data cannot be fetched!'
            });
        }
    }
    res.status(401).json({
        error: true,
        message: 'Not allowed!'
    });
}