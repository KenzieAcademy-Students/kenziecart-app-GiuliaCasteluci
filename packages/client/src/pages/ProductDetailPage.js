import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ErrorBoundary, LoadingSpinner } from 'components'
import { useAxios } from 'hooks'
import ProductBox from 'components/ProductBox'

const ProductDetailPage = () => {
  let params = useParams();
  const { data, loading, error } = useAxios({
    config: { url: `products/${params.pid}` },
  })

  return (
    <Container className='h-100'>
      <ErrorBoundary>
        {error ? (
          <p>Error...</p>
        ) : (
          (() => {
            switch (loading) {
              case false:
                return <ProductBox product={data} />
              case true:
                return <LoadingSpinner full />
              default:
                return null
            }
          })()
        )}
      </ErrorBoundary>
    </Container>
  )
}

export default ProductDetailPage