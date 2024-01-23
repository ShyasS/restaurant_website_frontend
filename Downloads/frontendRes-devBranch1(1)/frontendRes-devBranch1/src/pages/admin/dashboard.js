import { Link } from 'react-router-dom';
// import Sidebar from './Sidebar';

const DashboardPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="my-4">Dashboard</h1>
          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br /> <b>$3425</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Menus
                    <br /> <b>23</b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/menus"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br /> <b>345</b>
                  </div>
                </div>
                <Link
                  to="/admin/orders"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                    <br /> <b>55</b>
                  </div>
                </div>
                <Link
                  to="/admin/users"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-3">
              <div
                className="card text-white o-hidden h-100"
                style={{ backgroundColor: '#D22B2B' }}
              >
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Restaurants
                    <br /> <b>5</b>
                  </div>
                </div>
                <Link
                  to="/admin/restaurants"
                  className="card-footer text-white clearfix small z-1"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
