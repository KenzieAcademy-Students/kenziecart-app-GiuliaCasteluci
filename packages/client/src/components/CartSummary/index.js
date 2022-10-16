import useCurrency from 'hooks/useCurrency'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function CartSummary({ cartTotal }) {
  const { getPrice } = useCurrency()
  return (
    <div className='cart-summary'>
      <Container>
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
