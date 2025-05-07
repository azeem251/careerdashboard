import PagenotFound from "../../assets/images/not_found.png"
import { Link } from "react-router-dom";
const PageNotFound = () => {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold" style={{flexDirection:"column"}}>
        <img className="img-fluid" src={PagenotFound} alt="" />
      <div className="mx-auto text-center">
      <h3 className="font-bold" style={{fontFamily:"cursive"}}> 404 - Page Not Found</h3>
      <Link to="/main" className="text-white">  <button className="bg-slate-500 mt-2 text-white py-2 px-3 rounded " ><span style={{fontSize:"17px"}}>Go to Back</span></button></Link>
      </div>
      </div>
    );
  };
  
  export default PageNotFound;
  