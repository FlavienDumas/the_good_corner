import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

export const RecentAds = (): React.ReactNode => {
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
    useEffect(()=>{
        axios
            .get("http://localhost:5000/Ad")
            .then((result) => {
                setAds(result.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <main className="main-content">
            <h2>Annonces récentes</h2>
            <p>Prix total des produits ajoutés : {totalPrice}€</p>
            <p>Produits ajoutés : {totalItems}</p>
            <button onClick={reset}>Reset</button>
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
                        <button onClick={()=>{addTotal(ad.price)}}>Ajouter {ad.title} au total</button>
                    </div>
                ))}
            </section>
        </main>
    )
}
export default RecentAds;