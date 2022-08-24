import { useSelector } from 'react-redux';
import Card from './Card';
import Load from '../Load';

function Cards() {

    /*------ state ------*/
  
    const {albumData} = useSelector(state => state.album)
    
    /*====== DOM ======*/
    return (
        <>
            {
                (albumData.length <= 0)
                    ? <Load />
                    : <div>
                        {
                        albumData && albumData.map((post) => {
                            
                                return (<Card
                                    post={post}
                                    type="album"
                                    key={post._id}
                                />)
                            })
                        }
                    </div>}
        </>
    );
}
export default Cards;