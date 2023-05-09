"use client";

import React, { useEffect, useState } from "react";
import {
    CountryFlag,
    CountryTableActionBtn,
    CountryTableSectionTitle,
    CountryTableWrapper,
    FilterWrapper
} from "./styles";

interface ICountry {
    name: string;
    region: string;
    population: number;
    area: string;
    flag: string;
}

export function CountryTable() {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [regionFilter, setRegionFilter] = useState("");


    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch("https://restcountries.com/v2/all?limit=40");
            const data = await response.json();
            setCountries(data.slice(0, 40));
            setFilteredCountries(data.slice(0, 40));
        };
        fetchCountries().then(() => {
            setLoading(false);
        });
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        filterCountries(event.target.value, regionFilter);
    };

    const handleRegionFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRegionFilter(event.target.value);
        filterCountries(search, event.target.value);
    };

    const filterCountries = (searchValue: string, regionValue: string) => {
        let filtered = countries.filter((country) => {
            const nameMatch = country.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const regionMatch = country.region.toLowerCase() === regionValue.toLowerCase();
            return nameMatch && (regionValue === "" || regionMatch);
        });
        setFilteredCountries(filtered);
    };

    const sortCountries = (property: string) => {
        setSortBy(property);

        let sorted = filteredCountries.sort((a, b) => {
            return a[property] - b[property];
        });
        setFilteredCountries([...sorted]);
    };

    const handleRemoveCountry = (country: ICountry) => {
        let updatedCountries = filteredCountries.filter((c) => c !== country);
        setFilteredCountries(updatedCountries);
    };

    return (
        <CountryTableWrapper>
            <CountryTableSectionTitle>Filter</CountryTableSectionTitle>

            <FilterWrapper>
                <div>
                    <input type="text" value={search} placeholder="Search" onChange={handleSearchChange} />

                    <select value={regionFilter} onChange={handleRegionFilterChange}>
                        <option value="">All</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Australia">Australia</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                    </select>
                </div>
                <select value={sortBy} onChange={(e) => sortCountries(e.target.value)}>
                    <option value="">All</option>
                    <option value="population">Population</option>
                    <option value="area">Area</option>
                </select>
            </FilterWrapper>

            {!loading ? <table>
                <thead>
                    <tr>
                    <th>Country Name</th>
                    <th>Region</th>
                    <th>Population</th>
                    <th>Area</th>
                    <th>Flag</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredCountries.map((country) => (
                    <tr key={country.name}>
                        <td>{country.name}</td>
                        <td>{country.region}</td>
                        <td>{country.population}</td>
                        <td>{country.area} km<sup>2</sup></td>
                        <td>
                            <CountryFlag><img src={country.flag} alt={country.name + " flag"} /></CountryFlag>
                        </td>

                        <td>
                            <CountryTableActionBtn onClick={() => handleRemoveCountry(country)}>
                                X
                            </CountryTableActionBtn>
                        </td>
                    </tr>))}
                </tbody>
            </table> : <div>Loading....</div>}
        </CountryTableWrapper>
        )}
