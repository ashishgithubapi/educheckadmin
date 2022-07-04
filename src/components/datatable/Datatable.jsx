import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from 'axios';

const Datatable = () => {
  const {userData,loading,error,status} = useFetch(`${process.env.REACT_APP_API_URL}/getUser`);
 
  
  let OnLoadData = [];
  if(status){
    OnLoadData=userData.data.data;
    console.log("data",OnLoadData);
    console.log("data2",userRows);
  }
 
  const [data, setData] = useState(OnLoadData);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDelete = async (params) => {
    console.log(params);
   
    
  };

  const handleActiveUser = async (params) => {
    console.log(params);
   
    const userObject = {
      login_user_id: params._id,
      is_activate: 1
  };
  console.log("userObject",userObject);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/updateUser`,userObject);
      setData(OnLoadData);
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
           {/* <div
              className="deleteButton"
              onClick={() => {handleDelete(params.row)}}
            >
              Delete
           </div>*/}
            <div
              className="deleteButton"
              onClick={() => {handleActiveUser(params.row)}}
            >
              Update Status
            </div>
          </div>
        );
      },
    },
  ];
  return (
    
    <div className="datatable">
      <div className="datatableTitle">
        
        <Link to="/users/new" className="link">
          Add New333
        </Link>
      </div>
      <DataGrid
        getRowId={row => row._id}
        className="datagrid"
        rows={OnLoadData}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
