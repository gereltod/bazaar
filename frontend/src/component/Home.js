import React from "react";
import { ROOT_URL } from "../config/config";
import { productListApi, addBasketApi } from "../utils/api";

function RenderData({dataapi}){
  
  if (dataapi!==null) {
    return dataapi.map(data => {
      return (
        <div className="col-sm-4" key={data.product_id}>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src={`${ROOT_URL}/api/image/${data.product_image}`}
              className="card-img-top"
            
              alt="..."
              style={{ width: "200px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{data.product_name}</h5>
              <p className="card-text">{data.product_desc}</p>
              <button className="btn btn-primary" onClick={()=>{
                data.price = data.product_price;
                data.quantity = 1;
                
                addBasketApi(data)
              }}>
                Buy {data.product_price}
              </button>
            </div>
          </div>
        </div>
      );
    });
  } else {
    return <div></div>;
  }
}
export function Home() {
  const [dataProduct, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getProductList = async () => {
      setLoading(true);
      const data = await productListApi({});
      setLoading(false);
      setProduct(data);
    };
    getProductList();
  }, []);

  return (
    <div>
      <h1>Welcome to Shoping web</h1> <br />
      <div className="row"><RenderData dataapi={dataProduct} /></div>
    </div>
  );
}

export default Home;
