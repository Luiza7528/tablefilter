import styled from "styled-components";

export const CountryTableWrapper = styled.div`
    width: 1000px;
    
    table {
        width: 100%;
        border-spacing: unset;
    }
    
    thead tr {
        background: #edebeb;
    }
    
    thead th {
        text-transform: uppercase;
        color: gray;
    }
         
    thead th, tbody td {
        padding: 5px;
        text-align: left; 
    }
    
    tbody tr td{
        padding: 8px 0;
        border-bottom: 1px solid #edebeb;
    }
    
`;

export const CountryFlag = styled.div`
    max-width: 30px;
    
    img {
        max-width: 100%;
    }
    
`;

export const CountryTableActionBtn = styled.button`
    height: 30px;
    width: 30px;
    font-size: 14px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: none;
    border-radius: 50%;
    background: #efefef;
    cursor: pointer;
    
    &:hover {
        opacity: .9
    }
`;

export const CountryTableSectionTitle = styled.p`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const FilterWrapper = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 30px;
   
   input {
        margin-right: 20px
   }
`;