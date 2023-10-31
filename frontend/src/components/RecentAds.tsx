import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";
import { API_URL } from "@/config";

type RecentAdsProps = {
    title?: string;
    categoryId?: string
}

const RecentAds = (props: RecentAdsProps): React.ReactNode => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [ads, setAds] = useState([] as AdCardProps[])

    function addTotal(price: number){
        setTotalPrice(price+totalPrice)
        setTotalItems(totalItems + 1)
    }
    function reset(){
        setTotalPrice(0)
        setTotalItems(0)
    }
    function fetchAds() {
        let url = API_URL + '/Ad?';
        console.log("props.title = " + props.title)

        if (props.categoryId !== undefined && props.categoryId !== 'undefined') {
            url += `category=${props.categoryId}&`;
        }
        if (props.title !== undefined && props.title !== 'undefined') {
            url += `title=${props.title}&`;
        }
        axios
            .get(url)
            .then((result) => {
                setAds(result.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(()=>{
        fetchAds();
    }, [props.categoryId, props.title]);

    return (
        <main className="main-content">
            <h2>Annonces récentes</h2>
            <p>Prix total des produits ajoutés : {totalPrice}€</p>
            <p>Produits ajoutés : {totalItems}</p>
            <button className="button button-primary" onClick={reset}>Reset</button>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <div key={ad.id}>
                        <AdCard
                            id={ad.id}
                            title={ad.title}
                            price={ad.price}
                            picture={ad.picture}
                            link={"/ads/"+ad.id}
                        />
                    <div>
                        <button className="button" onClick={()=>{addTotal(ad.price)}}>Ajouter {ad.title} au total</button>
                    </div>
                        
                    </div>
                ))}
            </section>
        </main>
    )
}
export default RecentAds;