// import { useNavigate } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import axios from "../utils/axios";
// import { useState, useEffect, useMemo } from "react";
// import useDebounce from "../hooks/useDebounce"; 

// function Home() {
//   const [countries, setCountries] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchV, setSearchV] = useState("");
//   const [filteredD, setFilteredD] = useState([]);
//   const [loading, setLoading] = useState(false); // New loading state
//   const debouncedSearchTerm = useDebounce(searchV, 300); 
// console.log(countries);

//   const navigate = useNavigate();

//   const fetchCountries = (page) => {
//     setLoading(true); 
//     axios
//       .get(`/countries?limit=20&skip=${page}`)
//       .then((response) => {
//         setCountries(response.data.data);
//         setTotalPages(response.data.totalPages || 10);
//         setLoading(false); // Stop loading
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//         setLoading(false); // Stop loading on error
//       });
//   };

//   useEffect(() => {
//     fetchCountries(currentPage);
//   }, [currentPage]);

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       setLoading(true); // Start loading for search
//       axios
//         .get(`/countries?search=${debouncedSearchTerm}`)
//         .then((response) => {
//           setFilteredD(response.data.data);
//           setLoading(false); // Stop loading
//         })
//         .catch((error) => {
//           console.error("Error fetching filtered countries:", error);
//           setLoading(false); // Stop loading on error
//         });
//     } else {
//       setFilteredD(countries);
//     }
//   }, [debouncedSearchTerm, countries]);

//   const displayedCountries = useMemo(() => {
//     return filteredD.length > 0 ? filteredD : filteredD;
//   }, [filteredD, countries]);

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <div className="containerr p-4">
//       <div className="flex mt-[48px] flex-col md:flex-row md:justify-between gap-4">
//         {/* Search Input */}
//         <div className="relative flex w-full md:w-1/2 lg:w-1/3">
//           <CiSearch className="absolute text-black top-1/2 left-7 transform -translate-y-1/2 text-xl" />
//           <input
//             onChange={(e) => setSearchV(e.target.value)}
//             className="w-full pl-16 pr-4 py-5 rounded-md shadow-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
//             type="text"
//             placeholder="Search for a country…"
//           />
//         </div>

//         {/* Region Filter */}
//         <div className="w-full md:w-auto">
//           <select className="w-full md:w-auto px-8 py-5 rounded-md shadow-md pr-6 bg-white text-gray-900">
//             <option value="">Filter by Region</option>
//             <option value="Africa">Africa</option>
//             <option value="America">America</option>
//             <option value="Asia">Asia</option>
//             <option value="Europe">Europe</option>
//             <option value="Oceania">Oceania</option>
//           </select>
//         </div>
//       </div>

//       {/* Loading Spinner */}
//       {loading ? (
//        
//       ) : (
//         <>
//           {/* Country Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//             {displayedCountries.map((country, index) => (
//               <div onClick={() => navigate(`details/${country.name.slug}`)} key={index} className="bg-transparent cursor-pointer p-4 rounded-md shadow-md">
//                 <img
//                   className="w-full h-40 object-cover rounded-t-md"
//                   src={country.flags?.svg || country.flags?.png}
//                   alt={country.name.common}
//                 />
//                 <div className="p-4">
//                   <h3 className="font-bold text-xl">{country.name.common}</h3>
//                   <p>
//                     Population:{" "}
//                     <span className="font-semibold">
//                       {country.population.toLocaleString()}
//                     </span>
//                   </p>
//                   <p>
//                     Region: <span className="font-semibold">{country.region}</span>
//                   </p>
//                   <p>
//                     Capital:{" "}
//                     <span className="font-semibold">{country.capital?.[0]}</span>
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-center gap-10 mt-6">
//             <button
//               className="btn btn-primary w-32"
//               onClick={handlePrevious}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <button
//               className="btn btn-secondary w-32"
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Home;




import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "../utils/axios";
import { useState, useEffect, useMemo } from "react";
import useDebounce from "../hooks/useDebounce"; 

function Home() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchV, setSearchV] = useState("");
  const [region, setRegion] = useState(""); // New region state
  const [filteredD, setFilteredD] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchV, 300); 
  console.log(countries);

  const navigate = useNavigate();

  const fetchCountries = (page) => {
    setLoading(true); 
    axios
      .get(`/countries?limit=20&skip=${page}`)
      .then((response) => {
        setCountries(response.data.data);
        setTotalPages(response.data.totalPages || 10);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchCountries(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (debouncedSearchTerm || region) {
      setLoading(true);
      const query = `/countries?search=${debouncedSearchTerm}&region=${region}`;
      axios
        .get(query)
        .then((response) => {
          setFilteredD(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching filtered countries:", error);
          setLoading(false); 
        });
    } else {
      setFilteredD(countries);
    }
  }, [debouncedSearchTerm, region, countries]);

  const displayedCountries = useMemo(() => {
    return filteredD.length > 0 ? filteredD : filteredD;
  }, [filteredD, countries]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="containerr p-4">
      <div className="flex mt-[48px] flex-col md:flex-row md:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex w-full md:w-1/2 lg:w-1/3">
          <CiSearch className="absolute text-black top-1/2 left-7 transform -translate-y-1/2 text-xl" />
          <input
            onChange={(e) => setSearchV(e.target.value)}
            className="w-full pl-16 pr-4 py-5 rounded-md shadow-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500"
            type="text"
            placeholder="Search for a country…"
          />
        </div>

        {/* Region Filter */}
        <div className="w-full md:w-auto">
          <select
            className="w-full md:w-auto px-8 py-5 rounded-md shadow-md pr-6 bg-white text-gray-900"
            onChange={(e) => setRegion(e.target.value)} // Update region state
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* Country Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {displayedCountries.map((country, index) => (
              <div onClick={() => navigate(`details/${country.name.slug}`)} key={index} className="bg-transparent cursor-pointer p-4 rounded-md shadow-md">
                <img
                  className="w-full h-40 object-cover rounded-t-md"
                  src={country.flags?.svg || country.flags?.png}
                  alt={country.name.common}
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl">{country.name.common}</h3>
                  <p>
                    Population:{" "}
                    <span className="font-semibold">
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Region: <span className="font-semibold">{country.region}</span>
                  </p>
                  <p>
                    Capital:{" "}
                    <span className="font-semibold">{country.capital?.[0]}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-10 mt-6">
            <button
              className="btn btn-primary w-32"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary w-32"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
