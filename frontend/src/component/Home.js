import React from "react";
import { ROOT_URL } from "../config/config";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount() {
    axios.get(`${ROOT_URL}/api/products`).then(res => {
      this.setState({ data: res.data.data });
    });
  }

  renderData(dataapi) {
    if (dataapi) {
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
                <a href="#" className="btn btn-primary">Buy {data.product_price}</a>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div></div>;
    }
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div>
        <h1>Welcome to Shoping web</h1> <br />
        <div className="row">{this.renderData(data)}</div>
      </div>
    );
  }
}

export default Home;
