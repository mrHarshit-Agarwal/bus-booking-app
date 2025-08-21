import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchBuses } from "../services/api";
import BusCard from "../components/busCard";
import FilterSidebar from "../components/filterSideBar";
import BackButton from "../components/backButton";
import Loader from "../components/loader";

const BusList: React.FC = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = {
      ...Object.fromEntries(params.entries()),
      ...filters,
      page,
      limit: 10,
    };

    setLoading(true);
    searchBuses(query)
      .then((res) => {
        setBuses(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => alert("Error fetching buses"))
      .finally(() => setLoading(false));
  }, [location.search, filters, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <BackButton />
      <div className="row">
        <div className="col-md-3 mb-3">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <div className="col-md-9">
          <h2>Available Buses</h2>
          {loading ? (
            <Loader />
          ) : buses.length === 0 ? (
            <p>No buses found</p>
          ) : (
            buses.map((bus) => <BusCard key={bus._id} bus={bus} />)
          )}

          {/* Pagination */}
          {!loading && buses.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-secondary"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline-secondary"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusList;
