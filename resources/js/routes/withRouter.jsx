import { useLocation, useNavigate, useParams } from "react-router-dom";


export function withRouter(Children) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();

        return <Children { ...props } params ={ params } location={location} navigate={navigate} />;
      }
}