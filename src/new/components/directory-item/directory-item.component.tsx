
import {BackgroundImage,Body,DirectoryItemContainer} from './directory-item.styles'



type CategoryObject =  {
    id:number,
    title:string,
    imageUrl:JSX.Element, 
  }


const DirectoryItem = ( {category}:{category:CategoryObject} ) => {
    const {imageUrl , title} = category;
     
    return (
        <DirectoryItemContainer>
          <BackgroundImage imageUrl ={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>

    )
}

export default DirectoryItem