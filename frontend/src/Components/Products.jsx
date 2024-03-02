import React, { useEffect, useState } from "react";
import { getProduct } from "../Services/Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Products.css";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  let { keyword } = useParams();

  const {
    specifiedStandard,
    certificationStatus,
    surfaceFinish,
    hotForge,
    coldForge,
    shade,
    coatedMaterial,
    brand,
    mildSteelGrade,
    alloySteelGrade,
  } = useSelector((state) => state.filter.filters);

  useEffect(() => {
    dispatch(
      getProduct(keyword, currentPage, certificationStatus, surfaceFinish, hotForge, coldForge, shade, coatedMaterial)
    );
  }, [dispatch, keyword, currentPage, certificationStatus, surfaceFinish, hotForge, coldForge, shade, coatedMaterial]);

  const { venues, resultPerPage, venuesCount, loading } = useSelector((state) => state.products);
  // console.log(resultPerPage);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return (
    <div>
      {/* <h2>Products</h2> */}

      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Specified Standard</th>
            <th>Certification Status</th>
            <th>Coating Material</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.ItemNo}</td>
              {/* <td><a href="www.google.com">{venue.Description}</a></td> */}
              <td>{venue.Description}</td>
              <td>{venue.SpecifiedStandard}</td>
              <td>{venue.CertificationStatus}</td>
              <td>{venue.CoatedMaterial}</td>
              <td>
                <button to={venue._id}>
                  <Link to={venue._id}>Know More!</Link>
                </button>{" "}
              </td>

              {/* <td class="action">
        <button>Add</button>
        <button>Edit</button>
        <button>Delete</button>
      </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paginationBox">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={venuesCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </div>
    </div>
  );
};

export default Products;
