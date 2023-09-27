export type CategoryProps = {
    id: number,
    name: string,
    link: string
}

const Category = ({name, link}: CategoryProps): React.ReactNode => {
    return (
        <a href={link} className="category-navigation-link">{name}</a>
    )
}
export default Category;