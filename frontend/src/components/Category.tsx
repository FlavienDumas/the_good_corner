export type CategoryProps = {
    id: number,
    name: string,
    link: string
}

const Category = (props: CategoryProps): React.ReactNode => {
    return (
        <a href={props.link} className="category-navigation-link">{props.name}</a>
    )
}
export default Category;