import React from "react";

interface FilterSidebarProps {
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-3 border rounded bg-light">
      <h5>Filters</h5>

      <div className="mb-2">
        <label className="form-label">Seat Type</label>
        <select
          className="form-select"
          name="seatType"
          onChange={handleChange}
          value={filters.seatType || ""}
        >
          <option value="">All</option>
          <option value="normal">Normal</option>
          <option value="semi-sleeper">Semi-Sleeper</option>
          <option value="sleeper">Sleeper</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">AC</label>
        <select
          className="form-select"
          name="isAC"
          onChange={handleChange}
          value={filters.isAC || ""}
        >
          <option value="">All</option>
          <option value="true">AC</option>
          <option value="false">Non-AC</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label">Departure Slot</label>
        <select
          className="form-select"
          name="departureSlot"
          onChange={handleChange}
          value={filters.departureSlot || ""}
        >
          <option value="">All</option>
          <option value="morning">Morning (6AM-12PM)</option>
          <option value="afternoon">Afternoon (12PM-4PM)</option>
          <option value="evening">Evening (4PM-8PM)</option>
          <option value="night">Night (8PM-6AM)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;
