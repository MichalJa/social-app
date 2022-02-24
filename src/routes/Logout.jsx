
import axios from "axios";


export default function Logout() {

    let token = {
        'Content-Type': 'application/json',
        'Accept': 'application / json',
        'Authorization': 'Bearer ' + localStorage.token
    }

    console.log(token);

    axios.post(
        'https://akademia108.pl/api/social-app/user/logout',
        { 'headers': token }
    ).then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        localStorage.clear();
    }).catch((err) => {
        console.log("AXIOS ERROR: ", err);
    })
    localStorage.clear();
    // window.location.replace("/Home");
    return (
        <div>
            logging out
        </div>
    );


}