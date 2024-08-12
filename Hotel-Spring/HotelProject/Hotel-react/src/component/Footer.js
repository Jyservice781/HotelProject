import {Stack} from "react-bootstrap";

let Footer = () => {
    let styleList = {
        listStyleType: 'none',
        fontSize: '10px',
        margin: 0,
        marginBottom: 0,
        padding:0
    }
    let styleBody = {
        backgroundColor: '#999',
    }

    let styleWrap = {
        width:'80%'

    }

    let styleText = {
        fontSize: '8px',
        margin: 0,
    }

    return(
        <footer className="footer" style={styleBody}>
            <Stack direction="horizontal" gap={3} style={styleWrap} className={'container-fluid'}>
                <ul style={styleList}>
                    <li>
                        <p>제작자 :: :: ;:::::::</p>
                        <p>소요시간 :::::::::</p>
                        <p>발표일자 ::::::</p>
                        <p>아아아아아아아아ㅏ아아아아아아</p>
                        <p>제작사 : 비트컴퓨터학원생일동</p>
                    </li>
                </ul>
                <p className={'ms-auto'} style={styleText}>copyright© 2024.08.19.️</p>
            </Stack>
        </footer>
    )

}

export default Footer