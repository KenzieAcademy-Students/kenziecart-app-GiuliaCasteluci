import {Schema, model} from 'mongoose'

const couponSchema = new Schema ({

    code:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
        required: true,
        min: 0,
        max: 1
    }
}, {timestamps: true})

const Coupon = model('Coupon', couponSchema);

export default Coupon;