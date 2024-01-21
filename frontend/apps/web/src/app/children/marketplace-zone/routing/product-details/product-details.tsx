import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useLazyProductByIdQuery} from "@storage";

export function ProductDetails() {
    const routeParams = useParams();

    const [
        productRequestTrigger,
        productRequestState
    ] = useLazyProductByIdQuery()

    useEffect(() => {
        if (routeParams.id) {
            productRequestTrigger(parseInt(routeParams.id))
        }
    }, [routeParams]);

    return <>
        {
            productRequestState.currentData && !productRequestState.isLoading && <div>
                <img src={productRequestState.currentData.image}/>
                <p>{productRequestState.currentData.name}</p>
            </div>
        }
    </>
}
