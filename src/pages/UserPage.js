
import { useSelector } from "react-redux";
import Card from "../components/cards/Card";
import AlbumWithImages from '../components/forms/AlbumWithImages';
import UserInfo from "../components/UserInfo";
import UserSettings from "../components/UserSettings";
import LoginForm from "../components/forms/LoginForm";


function UserPage() {

    // REDUX CONSTANTS
    const {user, status} = useSelector((state) => state.user);
    const { albumData} = useSelector(state => state.album);

    const data = albumData.filter((album)=> {
        return album.user ==user.id ;
      });

    return (
        <div className='user-page page'>
            {status==="connected"
                ? <div className="grid-user-container">
                    <UserInfo user={user} />
                    <UserSettings />
                </div>
                : <div>
                    <h1>Vous n'êtes pas connecté</h1>
                    <LoginForm />
                </div>
            }
            {status ==="connected" &&  data.length > 0
                ? <div>
                    {data.map((post) => {
                        return (
                            <Card
                                type="album"
                                title={post.title}
                                post={post}
                                key={post._id}
                            />
                        )
                    })}
                </div>
                : <div>
                    <p className="info">Vous n'avez pas encore crée d'album</p>
                    <AlbumWithImages />
                </div>
            }
        </div>
    )
}

export default UserPage;