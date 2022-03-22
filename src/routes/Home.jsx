import { NavLink, Outlet, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Popup from "../Popup";
import { useState } from "react";
import Login from "./Login";
import { useEffect } from "react";
import like from '../like.png';
import liked from '../liked.png';
import trash from '../trash.png';
import unfollow from '../unfollow.png';
import follow from '../follow.png';
// function QueryNavLink({ to, ...props }) {
//     let location = useLocation();
//     return <NavLink to={to + location.search} {...props} />;
// }


export default function Home(props) {
    const [visibility, setVisibility] = useState(false);
    const [latestPosts, setLatestPosts] = useState([]);
    const [newPosts, setNewPosts] = useState("");
    const [createdPosts, setCreatedPosts] = useState([]);
    const [usersToFollow, setUsersToFollow] = useState([]);
    const [following, setFollowing] = useState([]);

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
    }


    const popupCloseHandler = (e) => {
        setVisibility(e);
    };

    const allfollows = () => {
        axios.post(
            'https://akademia108.pl/api/social-app/follows/allfollows',
            null,
            { 'headers': headers })
            .then((req) => {
                console.log("RESPONSE RECEIVED: ", req);
                setFollowing(req.data)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    const latest = () => {
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            null,
            { 'headers': headers }
        ).then(res => {
            console.log("RESPONSE RECEIVED: ", res.data);
            setLatestPosts(res.data);
        }).catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    }

    const recommendations = () => {
        axios.post(
            ' https://akademia108.pl/api/social-app/follows/recommendations',
            null,
            { 'headers': headers })
            .then((req) => {
                console.log("RESPONSE RECEIVED: ", req);
                setUsersToFollow(req.data)
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    useEffect(() => {

        const intervalId = setInterval(() => {
            latest();
        }, 10000);

        allfollows();
        latest();
        recommendations();
        


        if (localStorage.length === 0) {
            setTimeout(function () {
                setVisibility(true);
            }.bind(this), 10000)
        }

        // return (() => {
        //     clearInterval(intervalId);
        // })
    }, []);

    const handleNewPostText = (e) => {
        setNewPosts(e.target.value);
    };

    const handlePost = (e) => {
        if (props.currentUser) {
            if (newPosts) {
                e.preventDefault();
      
                axios.post(
                    'https://akademia108.pl/api/social-app/post/add',
                    { 'content': newPosts },
                    { 'headers': headers })
                    .then((req) => {
                        console.log("RESPONSE RECEIVED: ", req);
                        latest();
                    })
                    .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                    })
            } else {
                alert("You can't send empty posts");
            }
        } else {
            alert("Please log in first");
        }

    }
    let likeThis = like;

    const handleLikes = (e) => {
        if (likeThis === like) {
            axios.post(
                'https://akademia108.pl/api/social-app/post/like',
                { 'post_id': e },
                { 'headers': headers })
                .then((req) => {
                    console.log("RESPONSE RECEIVED: ", req);
                    likeThis = liked;
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })

        } else {
            axios.post(
                'https://akademia108.pl/api/social-app/post/dislike',
                { 'post_id': e },
                { 'headers': headers })
                .then((req) => {
                    console.log("RESPONSE RECEIVED: ", req);
                    likeThis = like;
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })

        }
    }

    const handleDelete = e => {
        axios.post(
            'https://akademia108.pl/api/social-app/post/delete',
            { 'post_id': e },
            { 'headers': headers })
            .then((req) => {
                console.log("RESPONSE RECEIVED: ", req);
                latest();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    const handleFollowUser = e => {
        axios.post(
            'https://akademia108.pl/api/social-app/follows/follow',
            { 'leader_id': e },
            { 'headers': headers })
            .then((req) => {
                console.log("RESPONSE RECEIVED: ", req);
                recommendations();
                allfollows();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    const handleUnFollow = e => {
        axios.post(
            'https://akademia108.pl/api/social-app/follows/disfollow',
            { 'leader_id': e },
            { 'headers': headers })
            .then((req) => {
                console.log("RESPONSE RECEIVED: ", req);
                allfollows();
                recommendations();
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    return (
        <div className="homeDisplay">

            <nav id="following" className="following">
                <h3>Following</h3>
                {following.map(({ id, username, email, avatar_url }) => <p className="follow" key={id}><img onClick={e => handleUnFollow(id)} className="unfollow" src={unfollow} alt="unfollow"></img>{username}<img className="UserImg" src={avatar_url} alt="avatar"></img></p>)}
            </nav>
            <nav id="homeNav" className="homeNav">
                <h3>people to follow</h3>
                {usersToFollow.map(({ username, id, email, avatar_url }) => <p className="follow" key={id}><img onClick={e => handleFollowUser(id)} className="unfollow" src={follow} alt="follow"></img>{username}<img className="UserImg" src={avatar_url} alt="avatar"></img></p>)}
                {/* <input
                    value={searchParams.get("filter") || ""}
                    onChange={event => {
                        let filter = event.target.value;
                        if (filter) {
                            setSearchParams({ filter });
                        } else {
                            setSearchParams({});
                        }
                    }}
                />
                {invoices
                    .filter(invoice => {
                        let filter = searchParams.get("filter");
                        if (!filter) return true;
                        let name = invoice.name.toLowerCase();
                        return name.startsWith(filter.toLowerCase());
                    })
                    .map(invoice => (
                        <QueryNavLink className={({ isActive }) => isActive ? "red" : "blue"}
                            style={({ isActive }) => {
                                return {
                                    display: "block",
                                    margin: "1rem 0",
                                    color: isActive ? "red" : ""
                                };
                            }}
                            to={`/home/${invoice.number}`}
                            key={invoice.number}
                        >
                            {invoice.name}
                        </QueryNavLink>
                    ))} */}
            </nav>
            <div className="postsClass">
                <div>
                    <p>New post</p>
                    <form>
                        <textarea className="newPostText" onChange={handleNewPostText}></textarea>
                        <button onClick={handlePost} className="postButton" type="submit">post</button>
                    </form>
                    <hr></hr>
                </div>
                {latestPosts.map(({ content, created_at, id }) => <div className="postPar" key={id}><img onClick={e => handleDelete(id)} className="deleteImg" src={trash} alt="trash"></img><img onClick={e => handleLikes(id)} className="likeImg" src={likeThis} alt="like"></img>{content}<p className="createdAt">{created_at}</p><hr></hr></div>)}
            </div>
            <div className="App">
                <Popup
                    onClose={popupCloseHandler}
                    show={visibility}
                    title="Log In"
                >
                    <Login setCurrentUser={props.setCurrentUser} setVisibility={setVisibility} />
                </Popup>
            </div>
        </div>
    );
}