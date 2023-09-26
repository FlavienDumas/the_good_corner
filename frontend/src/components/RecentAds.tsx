import { useState, useEffect } from "react";
import AdCard, { AdCardProps } from "./AdCard";

export const ads: AdCardProps[] = [
        {
            link:"/ads/table",
            imgUrl:"/images/table.webp",
            title:"Table",
            price:120
        },
        {
            link:"/ads/dame-jeanne",
            imgUrl:"/images/dame-jeanne.webp",
            title:"Dame-jeanne",
            price:75
        },
        {
            link:"/ads/vide-poche",
            imgUrl:"/images/vide-poche.webp",
            title:"Vide-poche",
            price:4
        },
        {
            link:"/ads/vaisselier",
            imgUrl:"/images/vaisselier.webp",
            title:"Vaisselier",
            price:900
        },
        {
            link:"/ads/bougie",
            imgUrl:"/images/bougie.webp",
            title:"Bougie",
            price:8
        },
        {
            link:"/ads/porte-magazine",
            imgUrl:"/images/porte-magazine.webp",
            title:"Porte-magazine",
            price:45
        }
    ]

export const RecentAds = (): React.ReactNode => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [warning, setWarning] = useState("")
    function addTotal(price: number){
        setTotalPrice(price+totalPrice)
        setTotalItems(totalItems + 1)
    }
    function reset(){
        setTotalPrice(0)
        setTotalItems(0)
    }
    useEffect(()=>{
        if (totalPrice === 0){
            setWarning("")
        } else if (totalPrice < 50) {
            setWarning("même pas 50€? jpp le mec est juste pauvre en fait")
        } else if (totalPrice > 50 && totalPrice < 500) {
            setWarning("")
        } else if (totalPrice > 500) {
            setWarning("plus de 500€? j'espère que tu sais ce que tu fais...")
        }
    }, [totalPrice])

    return (
        <main className="main-content">
            <h2>Annonces récentes</h2>
            <p>Prix total des produits ajoutés : {totalPrice}€ {warning}</p>
            <p>Produits ajoutés : {totalItems}</p>
            <button onClick={reset}>Reset</button>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <div>
                    <AdCard
                        key={ad.title}
                        link={ad.link}
                        imgUrl={ad.imgUrl}
                        title={ad.title}
                        price={ad.price}
                    />
                    <button onClick={()=>{addTotal(ad.price)}}>Ajouter {ad.title} au total</button>
                    </div>
                ))}
            </section>
        </main>
    )
}
export default RecentAds;