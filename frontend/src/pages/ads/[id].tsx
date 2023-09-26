import { useRouter } from "next/router";
import { ads } from "@/components/RecentAds";
import AdCard, { AdCardProps } from "@/components/AdCard";

const AdDetailComponent = () => {
    const router = useRouter();
    console.log(router);
    const adId = router.query.id as string;
    let foundAd: AdCardProps = {
        title: "nothing found! click to return",
        imgUrl: "",
        price: 0,
        link: "/"
    };
    for (const ad of ads) {
        if (ad.link.endsWith(adId)) {
            foundAd = ad;
            break;
        }
    }
    return (
        <>
            <p>détails de l'annonce {router.query.id} :</p>
            <AdCard
                key={foundAd.title}
                link={foundAd.link}
                imgUrl={foundAd.imgUrl}
                title={foundAd.title}
                price={foundAd.price}
            />
        </>
    )
}

export default AdDetailComponent;