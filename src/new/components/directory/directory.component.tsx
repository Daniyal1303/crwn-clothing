import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss'

type CategoryObject =  {
    id:number,
    title:string,
    imageUrl:string,
  }
 

const Directory = (props: {categories:CategoryObject[]}) => {

    const {categories} = props;
    
    return(

        <div className="directory-container">
        {categories.map((category:CategoryObject) => (
          <DirectoryItem key={category.id} category={category} />
        ))}
        
      </div>
    )
   
}

export default Directory;
