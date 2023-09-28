import { FormEvent, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/config";

type category = {
    id: number,
    name: string
}

const NewAd = () => {
    const [categories, setCategories] = useState<category[]>([]);
    const [confirmation, setConfirmation] = useState("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [picture, setPicture] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    const [titleWarning, setTitleWarning] = useState<string>("");
    const [descriptionWarning, setDescriptionWarning] = useState<string>("");
    const [ownerWarning, setOwnerWarning] = useState<string>("");
    const [priceWarning, setPriceWarning] = useState<string>("");
    const [pictureWarning, setPictureWarning] = useState<string>("");
    const [locationWarning, setLocationWarning] = useState<string>("");

    useEffect(()=>{
        const fetchCategories = async () => {
            const result = await axios.get<category[]>(API_URL + "/Category")
            setCategories(result.data);
        };
        fetchCategories();
    }, [])

    useEffect(()=>{
        if (title.length < 3 || title.length > 100) {
            setTitleWarning("champs entre 3 et 100 caractères!")
        } else {
            setTitleWarning("")
        }
        if (description.length < 3 || description.length > 2000) {
            setDescriptionWarning("champs entre 3 et 2000 caractères!")
        } else {
            setDescriptionWarning("")
        }
        if (owner.length < 3 || owner.length > 50) {
            setOwnerWarning("champs entre 3 et 50 caractères!")
        } else {
            setOwnerWarning("")
        }
        if (price > 0) {
            setPriceWarning("")
        } else {
            setPriceWarning("Le prix doit être supérieur à 0!")
        }
        if (picture.length < 3) {
            setPictureWarning("le champs doit faire au moins 3 caractères")
        } else {
            setPictureWarning("")
        }
        if (location.length < 3 || location.length > 50) {
            setLocationWarning("champs entre 3 et 50 caractères!")
        } else {
            setLocationWarning("")
        }
    }, [title, description, owner, price, picture, location])

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJSON = Object.fromEntries(formData.entries());

        axios.post(API_URL + "/Ad", formJSON)
        .then(response => {
            if ("id" in response.data) {
                setConfirmation("Annonce créée!")
                console.log(response.data);
            } else {
                setConfirmation("Un problème est survenu...");
                console.log(response.data);
                for (const i in response.data){
                    console.log("problème : " + response.data[i].constraints.isLength);
                }
            }
        })
        .catch(error => {
            console.error("Erreur lors de la requête : ", error);
        });;
    }
    return (
        <main className="main-content">
            <form onSubmit={submit}>
                <label>
                    Titre de l'annonce <br />
                    <input type="text" className="text-field" name="title" 
                    onChange={e => setTitle(e.target.value)} />
                     {titleWarning}<br />
                </label>
                <label>
                    Description de l'annonce <br />
                    <input type="text" className="text-field" name="description" 
                    onChange={e => setDescription(e.target.value)}/>
                     {descriptionWarning}<br />
                </label>
                <label>
                    Créateur de l'annonce <br />
                    <input type="text" className="text-field" name="owner" 
                    onChange={e => setOwner(e.target.value)}/>
                     {ownerWarning}<br />
                </label>
                <label>
                    Prix de vente <br />
                    <input type="number" className="text-field" name="price" 
                    onChange={e => setPrice(Number(e.target.value))}/>
                     {priceWarning}<br />
                </label>
                <label>
                    URL de l'image <br />
                    <input type="text" className="text-field" name="picture" 
                    onChange={e => setPicture(e.target.value)}/>
                     {pictureWarning}<br />
                </label>
                <label>
                    Localisation <br />
                    <input type="text" className="text-field" name="location" 
                    onChange={e => setLocation(e.target.value)}/>
                     {locationWarning}<br />
                </label>
                <label>
                    Catégorie <br />
                    <select name="categoryId" className="text-field">
                        {categories.map((category)=>(
                            <option value={category.id} key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="button">Submit</button>
                <p>{confirmation}</p>
            </form>
        </main>
    )
}
export default NewAd;