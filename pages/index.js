import Image from "next/image"
import { useMoralis, useMoralisQuery } from "react-moralis"
import styles from "../styles/Home.module.css"

export default function Home() {
    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        // TableName
        // Function for the query
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    console.log(listedNfts)

    return (
        <div className="contrainer mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div>
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes)
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                >
                                    <h3>price={price}</h3>
                                    <h3>nftAddress={nftAddress}</h3>
                                    <h3>tokenId={tokenId}</h3>
                                    <h3>marketplaceAddress={marketplaceAddress}</h3>
                                    <h3>seller={seller}</h3>
                                    <h3>key={`${nftAddress}${tokenId}`}</h3>
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently NOT Enable</div>
                )}
            </div>
        </div>
    )
}
