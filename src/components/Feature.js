import { useNavigate } from "react-router-dom";
export default function Feature() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    const goFoward = () => {
        navigate(+1)
    }
   
    return (
        <section className="pageSetup">
            <div className='buttonContain'>
                <button className='button button-special' onClick={goBack}>{String('Go Back')}</button>
                <button className='button button-special' onClick={goFoward}>{String('Next')}</button>
            </div>
        </section>
    )
}