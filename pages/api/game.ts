import {NextApiRequest, NextApiResponse} from "next";

let result = {
    winZero: 0,
    winCross: 0
};

type Req = {
    winZero: number;
    winCross: number;
}

type CustomNextApiRequest = NextApiRequest & {
    body: Req
}

export default function game (req: CustomNextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        result = {
            winCross: req.body.winCross,
            winZero: req.body.winZero,
        }
        res.status(200).json('success');
    } else {
        res.status(200).json(result)
    }
}