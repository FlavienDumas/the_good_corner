import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config";
import { CategoryProps } from "./Category";
import { useRouter } from "next/router";

type AdFormProps = {
    action: string
    id?: number,
    title?: string,
    description?: string,
    owner?: string,
    price?: number,
    picture?: string,
    location?: string,
    categoryId?: number
}

const AdForm = (props: AdFormProps): React.ReactNode => {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [message, setMessage] = useState("");

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [owner, setOwner] = useState(props.owner);
    const [price, setPrice] = useState(props.price);
    const [picture, setPicture] = useState(props.picture);
    const [location, setLocation] = useState(props.location);
    const [category, setCategory] = useState(props.categoryId);

    const router = useRouter();

    useEffect(()=>{
        fetchCategories();
    }, [])

    const fetchCategories = async () => {
        const result = await axios.get<CategoryProps[]>(API_URL + "/Category")
        setCategories(result.data);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement)
        const formJSON = Object.fromEntries(formData.entries());
        
        if (props.action === "Post") {
            console.log("action = Post");
            axios
                .post(API_URL + "/Ad", formJSON)
                .then(response => {
                    if (response.data.state === 'Success') {
                        router.replace("/");
                    } else {
                        setMessage("Annonce inchangée, problème rencontré")
                    }
            })
            .catch(error => {
                setMessage("Un problème est survenu...")
                console.error("Erreur lors de la requête : ", error);
            });;
        } else if (props.action === "Patch") {
            console.log("action = Patch");
            axios
                .patch(API_URL + "/Ad/" + props.id, formJSON)
                .then(response => {
                    if (response.data.state === 'Success') {
                        router.replace("/");
                    } else if (response.data.state === 'Failure') {
                        setMessage("Annonce inchangée, problème rencontré")
                    }
            })
            .catch(error => {
                setMessage("Un problème est survenu...");
                console.error("Erreur lors de la requête : ", error);
            });;
        }
    }
    return (
        <form onSubmit={submit}>
            <label>
                Titre de l'annonce <br />
                <input type="text" className="text-field" name="title" value={title}
                onChange={e => setTitle(e.target.value)} /><br />
            </label>
            <label>
                Description de l'annonce <br />
                <input type="text" className="text-field" name="description" value={description}
                onChange={e => setDescription(e.target.value)}/><br />
            </label>
            <label>
                Créateur de l'annonce <br />
                <input type="text" className="text-field" name="owner" value={owner}
                onChange={e => setOwner(e.target.value)}/><br />
            </label>
            <label>
                Prix de vente <br />
                <input type="number" className="text-field" name="price" value={price}
                onChange={e => setPrice(Number(e.target.value))}/><br />
            </label>
            <label>
                URL de l'image <br />
                <input type="text" className="text-field" name="picture" value={picture}
                onChange={e => setPicture(e.target.value)}/><br />
            </label>
            <label>
                Localisation <br />
                <input type="text" className="text-field" name="location" value={location}
                onChange={e => setLocation(e.target.value)}/><br />
            </label>
            <label>
                Catégorie <br />
                <select name="category" className="text-field" value={category} onChange={e => setCategory(Number(e.target.value))}>
                    {categories.map((category)=>(
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            <button className="button button-primary">Submit</button>
            <p>{message}</p>
        </form>
    )
}
export default AdForm;