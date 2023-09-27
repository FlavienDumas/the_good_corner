import { FormEvent, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

type category = {
    id: number,
    name: string
}

const NewAd = () => {
    const [categories, setCategories] = useState<category[]>([]);
    const [confirmation, setConfirmation] = useState("");
    useEffect(()=>{
        const fetchCategories = async () => {
            const result = await axios.get<category[]>("http://localhost:5000/Category")
            setCategories(result.data);
        };
        fetchCategories();
    }, [])
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJSON = Object.fromEntries(formData.entries());

        axios.post("http://localhost:5000/Ad", formJSON)
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
        <form onSubmit={submit}>
            <label>
                Titre de l'annonce <br />
                <input type="text" className="text-field" name="title" /><br />
            </label>
            <label>
                Description de l'annonce <br />
                <input type="text" className="text-field" name="description" /><br />
            </label>
            <label>
                Créateur de l'annonce <br />
                <input type="text" className="text-field" name="owner" /><br />
            </label>
            <label>
                Prix de vente <br />
                <input type="number" className="text-field" name="price" /><br />
            </label>
            <label>
                URL de l'image <br />
                <input type="text" className="text-field" name="picture" /><br />
            </label>
            <label>
                Localisation <br />
                <input type="text" className="text-field" name="location" /><br />
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
    )
}
export default NewAd;