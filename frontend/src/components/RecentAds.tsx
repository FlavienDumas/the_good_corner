import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useQuery } from '@apollo/client';
import { queryAllAds } from "@/query&mutations";

type RecentAdsProps = {
    searchTitle?: string;
    categoryId?: string
}

const RecentAds = (props: RecentAdsProps): React.ReactNode => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [ads, setAds] = useState([] as AdCardProps[])
    const { loading, error, data } = useQuery(queryAllAds, {
        variables: {
            where: {
              ...(props.categoryId ? { categoryIn: [props.categoryId] } : {}),
              ...(props.searchTitle ? { searchTitle: props.searchTitle } : {}),
            }
          }
    });

    function addTotal(price: number){
        setTotalPrice(price+totalPrice)
        setTotalItems(totalItems + 1)
    }
    function reset(){
        setTotalPrice(0)
        setTotalItems(0)
    }

    useEffect(()=>{
        if (!loading){
            setAds(data.allAds);
        }
    }, [loading]);

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