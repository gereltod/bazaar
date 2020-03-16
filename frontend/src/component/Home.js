import React from "react";
import { ROOT_URL } from "../config/config";
import { productListApi } from "../utils/api";

function RenderData({dataapi}){
  console.log(dataapi);
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
              <a href="#" className="btn btn-primary">
                Buy {data.product_price}
              </a>
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
      console.log(data)
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
