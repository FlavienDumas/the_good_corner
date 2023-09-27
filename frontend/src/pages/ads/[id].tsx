import { useRouter } from "next/router";
import AdCard, { AdCardProps } from "@/components/AdCard";
import axios from "axios";
import { useEffect, useState } from "react";

const AdDetailComponent = () => {
    const [ad, setAd] = useState({} as AdCardProps);

    const router = useRouter();
    const adId = router.query.id;

    async function fetchAd() {
        const result = await axios.get(`http://localhost:5000/Ad?id=${adId}`);
        setAd(result.data[0]);
    }

    useEffect(()=>{
        if (adId !== undefined) {
            fetchAd();
        }
    }, [adId])

    return (
        <>
            <p>détails de l'annonce {adId} :</p>
            <AdCard
                key={ad.id}
                id={ad.id}
                link={ad.link}
                picture={ad.picture}
                title={ad.title}
                price={ad.price}
            />
        </>
    )
}

export default AdDetailComponent;