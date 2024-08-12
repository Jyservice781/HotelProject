import {Card} from "react-bootstrap";

let PopularHotel = ({max}) => {
    return(
           <a style={{marginTop: '40px', cursor: 'pointer'}}>
               {Array.from({length: max}, (_, index) => (
                   <div style={{display: 'inline-block'}}>
                       <Card style={{width:'300px', height:'180px', margin:'10px 5px 10px'}}>
                           <Card.Img variant="top" src="holder.js/100px180" style={{width: '100%', height: '100%'}}/>
                           <Card.Body>
                               <Card.Text>
                                   Some quick example text to build on the card title and make up the
                                   bulk of the card's content.
                               </Card.Text>
                           </Card.Body>
                       </Card>
                   </div>
               ))}
           </a>
    )
}

export default PopularHotel;