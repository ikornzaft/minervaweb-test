import React, {useState} from 'react';
import { Text, Image } from '@chakra-ui/react';

const ArticleContentList = ({ data, setData }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const listItems = (el) => {
    if (el.image) {

      return (<div><Image w="120px" h="120px" objectFit="cover" src={el.image} />
      <Text>Imagen</Text></div>)
    }
      return <Text>{el}</Text>
    }
  
  return (
    <div>
    <h1>Contenido</h1>
      {data.paragraphs.map(el => listItems(el))}
    </div>
    )
  };
  
  export { ArticleContentList };
