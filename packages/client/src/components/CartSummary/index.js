import useCurrency from 'hooks/useCurrency'
import useProvideCart, {useCart} from 'hooks/useCart'
import React, {useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from '../../utils/axiosConfig'

const initialState = {
  code: '',
  discount: 0
}

export default function CartSummary({ cartTotal }) {
  const [coupon, setCoupon] = useState(initialState)
  const { applyCoupon } = useProvideCart()
  const { getPrice } = useCurrency()
  
  const handleChange = (e) => {
    setCoupon({
      ...coupon,
      [e.target.name]: e.target.value
    })
  }

  const handleApplyCoupon = (e) => {
   e.preventDefault();

   axios.get(`coupons/verify?code=${coupon.code}`)
   .then((response) => {
    setCoupon ({
      ...coupon,
      discount: response.data
    })
    applyCoupon({
      ...coupon, discount: response.data
    })
   })
   .catch((err) => {
    toast.error(" coupon invalid")
   })
    
  }  
  return (
    <div className='cart-summary'>
      <Container>
      <Row className='mb-2 summary-item'>
        {
          coupon.discount === 0 ?
          <>
        <Col as={Form.Group} xs={9}>
          <Form.Control
            type= "text"
            placeholder="Coupon Code"
            name= "code"
            value= {coupon.code}
            onChange={handleChange} /> 
        </Col>
        <Col xs={3}>
        <Button variant="info" onClick={handleApplyCoupon}>
          Apply Coupon
          </Button>
        </Col>
        </>
        :
        <>
        <Col xs={6}>
          Coupon Applied Successfully
        </Col> 
        <Col xs={6}>
          {coupon.code.toUpperCase()} - {100 * coupon.discount}% off
        </Col>

        </>
        }
        </Row>
        <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Free Shipping</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>$0</p>
          </Col>
        </Row>
        <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Total</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>{getPrice(cartTotal)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
