import {Router} from 'express';
import { Coupon } from '../models';

const counponsRouter = Router();

counponsRouter.get('/create', async (req, res) => {
    try {
        const {code, discount} = req.query

        const existingCoupon = await Coupon.findOne({code: code.toUpperCase()})

        if (existingCoupon) {
            return res.status(422).json({error: 'this coupon is already in use.'})
        }

        const coupon = await Coupon.create({code: code.toUpperCase(), discount})

        res.json(coupon)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong."})
    }
})

counponsRouter.get('/verify', async (req, res) => {
    try {
        const { code } = req.query

        const existingCoupon = await Coupon.findOne({code: code.toUpperCase() })

        if (!existingCoupon) {
            return res.status(404).json({error: "Coupon not found."});
        }

        res.json(existingCoupon.discount);
    } catch (error) {
        res.status(500).json({error: "not working"})
    }
});

export default counponsRouter;