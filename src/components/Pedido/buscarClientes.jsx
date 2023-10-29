import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const BuscarClientes = () => {
  const [myOptions, setMyOptions] = useState([])

  useEffect(() => {
    getDataFromAPI();
  }, []);

  const getDataFromAPI = () => {
    console.log("Options Fetched from API")
    const userToken = localStorage.getItem("user_token");
    const hasUser =  JSON.parse(userToken).userToken;
    fetch('http://localhost:3000/projects/listar-clientes', {
    headers: {
        Authorization: `Bearer ${hasUser}`
    }
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((res) => {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            myOptions.push(res[i].nome)
          }
          setMyOptions(myOptions)
        });
  } 

  return (
    <div style={{ marginLeft: '0%', marginTop: '0px' }}>
      <Autocomplete
        style={{ width: 500 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField {...params}
            variant="outlined"
            label="Search Box"
          />
        )}
      />
    </div>
  );
}

export default BuscarClientes;
