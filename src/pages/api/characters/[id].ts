import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";


const handler =async (req: NextApiRequest, res: NextApiResponse ) => {

    if (req.method !== 'GET') {
        res.status(405);
    }

    const id = req.query.id;

    const idStr = Array.isArray(id) ? id[0] : id || '';

    const idNum = parseInt(idStr);

    if(isNaN(idNum)) {
        return res.status(400).json({ err: "Please enter a valid number for character id" })
    }

    const character = await prisma.tog_character.findUnique({
        where: {
            id: idNum
        }
    });
    res.json(character)
}

export default handler;