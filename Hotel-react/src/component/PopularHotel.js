import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

let PopularHotel = ({max}) => {
    let navigate = useNavigate();

    let moveToDetail = () => {
        navigate('/details/');
    }

    return (
        <div style={{marginTop: '40px', cursor: 'pointer'}}>
            {Array.from({length: max}, (_, index) => (
                <a style={{display: 'inline-block'}} onClick={moveToDetail}>
                    <Card style={{width: '300px', height: '180px', margin: '10px 5px 10px'}}>
                        <Card.Img variant="top" src="holder.js/100px180" style={{width: '100%', height: '100%'}}/>
                        <Card.Body>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </a>
            ))}
        </div>
    )
}

export default PopularHotel;