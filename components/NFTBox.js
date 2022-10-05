import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import nftAbi from "../constants/BasicNft.json"

useState

export default function NFTBox({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [tokenName, setTokenName] = useState("")
    const [tokenDescription, setTokenDescription] = useState("")
    const [showModal, setShowModal] = useState(false)
    const hideModal = () => setShowModal(false)
    const dispatch = useNotification()

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`The TokenURI is ${tokenURI}`)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
}
