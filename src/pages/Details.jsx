import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

function Details() {
  const navigate = useNavigate();
    const { id } = useParams();

  const [country, setCountry] = useState(null);
  console.log(country);

  useEffect(() => {
    axios
      .get(`/countries/${id}`)
      .then((response) => setCountry(response.data))
      .catch((error) => console.error("Error fetching country:", error));
  }, [id]);

  if (!country) {
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="containerr mt-10 p-4 containerr">
      <button
        onClick={() => navigate("/")}
        className="mb-8 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md shadow-md"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Flag Section */}
        <div className="flag-container">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={`${country.name?.common} Flag`}
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>

        <div className="details-container">
          <h1 className="text-3xl font-bold mb-4">{country.name?.common}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <strong>Native Name: </strong>
                {country.name?.nativeName?.[
                  Object.keys(country.name?.nativeName)?.[0]
                ]?.common || country.name?.common}
              </p>
              <p>
                <strong>Population: </strong>
                {country.population?.toLocaleString()}
              </p>
              <p>
                <strong>Region: </strong>
                {country.region}
              </p>
              <p>
                <strong>Sub Region: </strong>
                {country.subregion}
              </p>
              <p>
                <strong>Capital: </strong>
                {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain: </strong>
                {country.cca3}
              </p>
              <p>
                <strong>Currencies: </strong>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency) => currency)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Languages: </strong>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="border-countries mb-4">
            <h3 className="text-lg font-semibold mb-2">Border Countries:</h3>
            <div className="flex gap-2 flex-wrap">
              {country.borders?.length > 0 ? (
                country.borders.map((border, index) => (
                  <span
                    onClick={() => navigate(`/details/${border.slug}`)}
                    key={index}
                    className=" cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-md shadow-sm text-sm"
                  >
                    {border.slug}
                  </span>
                ))
              ) : (
                <p>No border countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
