import { Link } from 'react-router-dom';
import './category-preview.styles.scss';


import ProductCard from '../product-card/product-card.component';

const CategoryPreview = ({title,products}:{title:string,products:any}) => {
return (
    <div className='category-preview-container'>
        <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
        </h2>
        <div className='preview'>
            {
            products.filter((_:any, idx:number)=> idx < 4 )
            .map((product:any)=> 
            <ProductCard key={product.id} product={product}/>
            )}
        </div>
    </div>
)


}

export default CategoryPreview;