import React, { useContext, useEffect } from "react";
import { UserContext } from "../component/context/userContext";
import { basketListApi } from "../utils/api";

function RenderDataBasket({ dataapi, fnSummary }) {
  const [summary, setValue] = React.useState(0);

  useEffect(() => {
    fnSummary(summary);
  }, [fnSummary]);

  let sum = 0;
  if (dataapi) {
    return dataapi.map(data => {
      let product = JSON.parse(data.product_json);

      sum += data.quantity * data.price;

      return (
        <tr key={data.basket_id}>
          <th scope="row">{data.basket_id}</th>
          <td>{product.product_name}</td>
          <td>{data.quantity}</td>
          <td>{data.price}</td>
          <td>{data.quantity * data.price}</td>
        </tr>
      );
    });
  } else {
    return (
      <tr>
        <td colSpan="4">Summary</td>
        <td>0</td>
      </tr>
    );
  }
  setValue(sum);
}

export function Basket() {
  const { user } = useContext(UserContext);
  const [dataBasket, setBasket] = React.useState(null);
  const [summary, setSummary] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getBasketList = async () => {
      setLoading(true);
      const data = await basketListApi({});

      setBasket(data);
      setLoading(false);
    };
    getBasketList();
  }, []);

  return (
    <div>
      <h2>Basket</h2>
      <div className="row">
        <div className="col-md">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Product name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Summary</th>
              </tr>
            </thead>
            <tbody>
              <RenderDataBasket dataapi={dataBasket} fnSummary={setSummary} />
              <tr>
                <td colSpan="4">Summary</td>
                <td>{summary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row"></div>
    </div>
  );
}
