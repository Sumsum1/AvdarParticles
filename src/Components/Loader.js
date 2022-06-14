//import './Loader.css';
import  './Loader.css'
import loader from './Loading.gif';

export const Loader = () => {
    return(
        <div className={'loader-container'}>
            <img className={'loader'} src={loader}/>        
        </div>
    )
}