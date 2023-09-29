import { useRouter } from "next/router";
import AdDetail, {AdDetailProps} from "@/components/AdDetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";

const AdDetailComponent = () => {
    const [ad, setAd] = useState({} as AdDetailProps);

    const router = useRouter();
    const adId = router.query.id;

    async function fetchAd() {
        const result = await axios.get(API_URL + `/Ad?id=${adId}`);
        setAd(result.data[0]);
    }

    useEffect(()=>{
        if (adId !== undefined) {
            fetchAd();
        }
    }, [adId])

    return (
        <AdDetail
            id={ad.id}
            title={ad.title}
            description={ad.description}
            owner={ad.owner}
            price={ad.price}
            picture={ad.picture}
            location={ad.location}
            createdAt={ad.createdAt}
            category={ad.category}
            link={ad.link}
        />
    )
}

export default AdDetailComponent;