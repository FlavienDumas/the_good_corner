import AdEdit from "@/components/AdForm";

const NewAd = () => {
    return (
        <main className="main-content">
            <h2>Création d'une Annonce</h2>
            <AdEdit 
                action="Post"
            />
        </main>
    )
}
export default NewAd;