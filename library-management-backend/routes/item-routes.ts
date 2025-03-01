import express from "express";
import Item from "../models/Item";
import {ItemAdd, ItemDelete, ItemGetAll, ItemGetById, ItemUpdate} from "../database/data-store";

const router = express.Router();

router.get("/get/:id", async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
      const item = await ItemGetById(id)
        res.json(item);
  }  catch (e) {
      console.error(e);
  }
})
router.post("/add",async (req: express.Request, res: express.Response) => {
    const addItem:Item = req.body;
    try {
        await ItemAdd(addItem);
        res.send("Item has been added");
    }catch (e) {
        console.error(e);
    }
})
router.put("/update/:id", async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    try {
        await ItemUpdate(id, req.body);
        res.status(200).send("Item has been updated");
    }catch (e) {
        console.error(e);
        res.status(500).send("Could not update item")
    }
})
router.delete("/delete/:id",async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    try {
        await ItemDelete(id);
        res.status(200).send("Item deleted successfully")
    }catch (e){
        console.error(e)
        res.status(500).send("Could not delete item");
    }
})
router.get('/getAll',async (req: express.Request, res: express.Response) => {
    try {
        res.json(await ItemGetAll());
    }catch (e){
        console.log(e)
        res.status(500).send("Error while loading item list")
    }
})



export default router;