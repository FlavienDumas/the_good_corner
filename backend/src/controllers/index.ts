import { Request, Response } from "express";

export class Controller {
    getAll = (req: Request, res: Response)=>{
        this.notImplemented(req, res)
    }

    createOne = (req: Request, res: Response)=>{
        this.notImplemented(req, res)
    }

    deleteOne = (req: Request, res: Response)=>{
        this.notImplemented(req, res)
    }
    patchOne = (req: Request, res: Response)=>{
        this.notImplemented(req, res)
    }

    notImplemented = (req: Request, res: Response)=>{
        res.status(404).json({
            message: "Méthode manquante, à créer?"
        })
    }
}