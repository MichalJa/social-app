
import axios from "axios";


export default function Logout() {

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application / json',
        'Authorization': 'Bearer ' + localStorage.token
    }

    axios.post(
        'https://akademia108.pl/api/social-app/user/logout',
        null,
        { 'headers': headers }
    ).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        localStorage.clear();
        window.location.replace("/Home");
    }).catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })
    return (
        <div>
            logging out
        </div>
    );


}