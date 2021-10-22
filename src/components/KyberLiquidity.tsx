import { BigNumber } from 'ethers'
import usePrices from 'hooks/usePrices'
import { useEffect, useState } from 'react'
import { getKyberLiquidity } from 'utils/poolData'

const KyberLiquidity = (props: {
  tokenAddress: string
  tokenPrice: BigNumber
}) => {
  const [tokenBalance, setTokenBalance] = useState<BigNumber>(BigNumber.from(0))
  const [wethBalance, setWethBalance] = useState<BigNumber>(BigNumber.from(0))

  const { ethereumPrice } = usePrices()

  useEffect(() => {
    getKyberLiquidity(props.tokenAddress).then((response) => {
      setTokenBalance(response.tokenBalance)
      setWethBalance(response.wethBalance)
    })
  }, [props.tokenAddress])

  const tokenTotal = props.tokenPrice.mul(tokenBalance)
  const wethTotal = ethereumPrice.mul(wethBalance)
  const totalLiquidity = tokenTotal.add(wethTotal)

  return (
    <div>Kyber Liquidity: ${totalLiquidity.toNumber().toLocaleString()}</div>
  )
}

export default KyberLiquidity