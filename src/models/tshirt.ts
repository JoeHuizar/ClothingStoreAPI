import {Request, Response, NextFunction} from 'express';

export class Tshirt {
  _model: any;
  constructor(norm: any) {
    this.model = [
      {
        id: { type: Number, key: "primary" },
        tshirt_name: { type: String, maxlength: 200 },
        brand: { type: String, maxlength: 48 },
        color: { type: String, maxlength: 24 },
        size: { type: String, maxlength: 24 },
        user_id: {
          type: Number,
          key: "foreign",
          references: { table: "User", foreignKey: "id" },
          onDelete: "cascade",
          onUpdate: "cascade",
        },
      },
      "A table to store tshirt model",
      [
        {
          route: "/get-all-tshirts",
          method: "GET",
          callback: this.getAllTshirts,
          requireToken: true,
        },
        {
          route: "/get-tshirt-by-color/:color",
          method: "GET",
          callback: this.getTshirtByColor,
          requireToken: true,
        },
        {
          route: "/create-tshirt",
          method: "POST",
          callback: this.createTshirt,
          requireToken: true,
        },
        {
          route: "/update-tshirt/id/:id",
          method: "PUT",
          callback: this.updateTshirt,
          requireToken: true,
        },
        {
          route: "/delete-tshirt/id/:id",
          method: "DELETE",
          callback: this.deleteTshirt,
          requireToken: true,
        }
      ]];
  }

  getAllTshirts(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
          get: ["*"]
      }
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.get(req, null, null);
      res.json({ message: "Success", resp });
    }
  }

  getTshirtByColor(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
          get: ["*"],
          where: {
            color: req.params.color
          }
      }
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.get(req, null, null);
      res.json({ message: "Success", resp });
    }
  }

  createTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body ===> ', req.body);
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.insert(req, null, null);
      res.json({ message: "Success", resp });
    }
  }

  deleteTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body ===> ', req.body);
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.remove(req, null, null);
      res.json({ message: "Success", resp });
    }
  }

  updateTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('req.body ===> ', req.body);
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.update(req, null, null);
      res.json({ message: "Success", resp });
    }
  }


  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }
}
