import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import axios from "axios";
import moment from "moment";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import { useState, useEffect, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TableFooter from "@mui/material/TableFooter";
import DownloadIcon from '@mui/icons-material/Download';
import {CSVLink} from 'react-csv';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {ToastContainer,toast} from 'react-toastify'


const columns = [
  // { id: "date", label: "Date", minWidth: 100 },
  // { id: "team", label: "Team", minWidth: 150 },
  // { id: "batch", label: "Batch", minWidth: 150 },
  { id: "aannotation", label: "Annotation", minWidth: 100 },
  { id: "aqc", label: "QC", minWidth: 100 },
  { id: "apmsme", label: "PM + SME", minWidth: 100 },
  { id: "atotal", label: "Total", minWidth: 100 },
  // { id: "hannotation", label: "Annotation", minWidth: 100 },
  // { id: "hqc", label: "QC", minWidth: 100 },
  // { id: "hpmsme", label: "PM + SME", minWidth: 100 },
  // { id: "hprojectTraning", label: "Project Traning", minWidth: 100 },
  // { id: "hojt", label: "OJT", minWidth: 100 },
  // { id: "hqualityfeedback", label: "Quality Feedback", minWidth: 100 },
  // { id: "hidleHours", label: "Idle Hours", minWidth: 100 },
  // { id: "hother", label: "Other", minWidth: 100 },
  // { id: "hcomments", label: "Comments", minWidth: 100 },
  // { id: "htotal", label: "Total", minWidth: 100 },
  // { id: "jannotation", label: "Annotation", minWidth: 100 },
  // { id: "jqc", label: "QC", minWidth: 100 },
  // { id: "jtotal", label: "Total", minWidth: 100 },
  { id: "jmanagerTeam", label: "Manager", minWidth: 100 },
  { id: "jstatus1", label: "Status", minWidth: 100 },
  { id: "jcDate", label: "EndDate", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 150 },
  // { id: 'jtotal', label: 'Total', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
];

function createData(
  date,
  team,
  projectname,
  batch,
  aannotation,
  aqc,
  apmsme,
  atotal,
  // hannotation,
  // hqc,
  // hpmsme,
  // hprojectTraning,
  // hojt,
  // hqualityfeedback,
  // hidleHours,
  // hother,
  // hcomments,
  // htotal,
  // jannotation,
  // jqc,
  // jtotal
  jmanagerTeam,
  jstatus1,
  jcDate
) {
  //   const density = population / size;
  return {
    date,
    team,
    batch,
    projectname,
    aannotation,
    aqc,
    apmsme,
    atotal,
    // hannotation,
    // hqc,
    // hpmsme,
    // hprojectTraning,
    // hojt,
    // hqualityfeedback,
    // hidleHours,
    // hother,
    // hcomments,
    // htotal,
    // jannotation,
    // jqc,
    // jtotal,
    jmanagerTeam,
    jstatus1,
    jcDate,
  };
}

const rowData = [];

axios
  .get("/billing/")
  .then((res) => rowData[res.data])
  .catch((err) => console.log(err));
console.log(rowData);

const rows = [
  rowData.map((item, index) => {
    createData(
      item.reportDate,
      item.team,
      item.projectname,
      item.batch,  
      item.associated.annotation,
      item.associated.qc,
      item.associated.pm,
      item.associated.total,
      item.jobs.managerTeam,
      item.jobs.status1,
      item.jobs.cDate,

      // item.hours.annotation,
      // item.hours.qc,
      // item.hours.pm,
      // item.hours.training,
      // item.hours.otj,
      // item.hours.qcFeedback,
      // item.hours.other,
      // item.hours.total,
      // item.jobs.annotation,
      // item.jobs.qc,
      // item.jobs.total

      // item.jobs.managerTeam,
      // item.jobs.status1,
      // item.jobs.cDate,
    );
  }),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [total,setTotal] = useState({
    countTotal:0,
    hoursTotal:0,
    jobTotal:0
  })

  const headers = [
    {label:'Date',key:'reportDate'},
    {label:'Team',key:'team'},
    {label:'Projectname',key:'projectname'},
    {label:'Batch',key:'batch'},
    {label:'Count of Associates | Annotation',key:'associated.annotation'},
    {label:'Count of Associates | QC',key:'associated.qc'},
    {label:'Count of Associates | PM+SME',key:'associated.pm'},
    {label:'Count of Associates | Total',key:'associated.total'},
    // {label:'Total Hours Spent | Annotation',key:'hours.annotation'},
    // {label:'Total Hours Spent | QC',key:'hours.qc'},
    // {label:'Total Hours Spent | PM+SME',key:'hours.pm'},
    // {label:'Total Hours Spent | Project Training',key:'hours.training'},
    // {label:'Total Hours Spent | OJT',key:'hours.ojt'},
    // {label:'Total Hours Spent | Quality Feedback',key:'hours.qcFeedback'},
    // {label:'Total Hours Spent | Other',key:'hours.other'},
    // {label:'Total Hours Spent | Idle Hours',key:'hours.idle'},
    // {label:'Total Hours Spent | Total',key:'hours.total'},
    // {label:'Total Hours Spent | Comments',key:'hours.comments'},
    // {label:'Total Jobs worked on | Annotation',key:'jobs.annotation'},
    // {label:'Total Jobs worked on | Qc',key:'jobs.qc'},
    // {label:'Total Jobs worked on | Total',key:'jobs.total'},
    {label:'Total Jobs worked on | Manager',key:'jobs.managerTeam'},
    {label:'Total Jobs worked on | Status',key:'jobs.status1'},
    {label:'Total Jobs worked on | EndDate',key:'jobs.cDate'},
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(()=>{
    var countTotal=0 
    // var hoursTotal =0
    // var jobTotal = 0
    let activeCount = 0;
    let completedCount = 0;
    let  projectTotal =0;

    data.map((item)=>{
      countTotal += item.associated.total
      // projectTotal += item.projectname
      projectTotal += item.projectname ? 1 : 0;
      // hoursTotal += item.hours.total
      // jobTotal += item.jobs.total
      if (item.jobs.status1 === "Active") {
        activeCount++;
      } else if (item.jobs.status1 === "Completed") {
        completedCount++;
      }
    });
    
    setTotal({
      ...total,
      countTotal: countTotal,
      // hoursTotal: hoursTotal,
      // jobTotal:jobTotal
      activeCount,
      completedCount,
      projectTotal,
    })
  },[data])

  // React.useEffect(()=>{
  //   axios.get("/billing/")
  //   .then((res)=>setData(res.data))
  //   .catch(err=>console.log(err))
  // },[])

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (id) => {
    axios
      .delete("/billing/" + id)
      .then((res) => toast.warn(res.data))
      .catch((err) => console.log(err));
    setData(data.filter((el) => el._id !== id));
  };

  // card
  const initialValues = {
    startDate: "",
    endDate: "",
    team: "",
  };
  const [values, setValues] = useState(initialValues);

  const [teamList, setTeamList] = useState(null);
  // const [report, setReport] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  // const handleChange = (event, value) => setEmpName(value);
  const handleTeamChange = (event, value) => setTeamList(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const sDate = values.startDate;
    const eDate = values.endDate;
    const team = teamList;

    if (team == null) {
      axios
        .get("billing/fetch/date/?sDate=" + sDate + "&eDate=" + eDate)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          "billing/fetch/report/?sDate=" +
            sDate +
            "&eDate=" +
            eDate +
            "&team=" +
            team
        )
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(`Error:${err}`));
    }
  };
  const allReport = (e) => {
    axios
      .get("/billing/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // Team List
  const list = [
    "CV",
    "NLP",
    "CM",
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid item xs={12} mt={1} mb={10}>
        <Card>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Project Reports
              </MDTypography>
            </MDBox>
            <MDBox
              pt={6}
              px={4}
              display="flex"
              justifycontent="space-evenly"
              alignItems="center"
            >
              <Grid container spacing={3}>
                {/* <Grid item xs={12} md={4}> */}
                <Grid item xs={3} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Start Date
                  </MDTypography>
                  <MDInput
                    type="date"
                    name="startDate"
                    value={values.startDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={3} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    End Date
                  </MDTypography>
                  <MDInput
                    type="date"
                    name="endDate"
                    value={values.endDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={1} md={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Team
                  </MDTypography>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={list}
                    onChange={handleTeamChange}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                {/* <Grid item xs={1} md={2}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Batch
                  </MDTypography>
                  <Autocomplete
                    id="combo-box-demo"
                    options={name.map((option) => option.name)}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} size="medium" />}
                    // sx={{ width: "180px" }}
                    sx={{ width: 200 }}
                  />
                </Grid> */}
                <Grid item xs={1} md={2}>
                  <MDBox
                    pt={4}
                    pb={3}
                    // px={2}
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                  >
                    <MDButton variant="gradient" color="success" type="submit">
                      &nbsp;Search
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox
              pt={3}
              pb={3}
              px={2}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <MDButton
                variant="gradient"
                color="error"
                onClick={allReport}
                // onClick={() => setShow(!show)}
              >
                &nbsp;Get All Report
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12} mt={1} mb={10}>
        <Paper sx={{ width: "100%" }}>
          {/* <MDBox
              mx={2}
              // mt={-3}
              py={3}
              pt={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Project Reports
              </MDTypography>
            </MDBox> */}
            
          <TableContainer sx={{ maxHeight: 540 }}>
          <Table >
          <TableHead>
          <TableRow>
                  {/* <TableCell align="center" bgcolor="#e91e63" colSpan={3}>
                    Item
                  </TableCell> */}
                  <TableCell align="center"  bgcolor="#f3e5f5" colSpan={4}>
                  {/* Total Count of Associates : <b>{total.countTotal}</b> */}
                   Active project : <b>{total.activeCount}</b>
                  </TableCell>
                  <TableCell align="center" bgcolor="#a7ffeb"  colSpan={10}>
                  {/* Total Completed project : <b>{total.hoursTotal}</b> */}
                   Completed project : <b>{total.completedCount}</b>
                  </TableCell>
                  <TableCell align="center" bgcolor="#ffe0b2" colSpan={4}>
                   {/* Total Project : <b>{total.jobTotal}</b> */}
                   Total Project : <b>{total.projectTotal}</b>
                  </TableCell>
                  <TableCell align="center"  colSpan={4}>
                  <MDButton type="submit" color="info" >  <CSVLink data={data} filename={"Billing.csv"} headers={headers} >
                     <MDTypography variant="h6" fontWeight="light" color="white" >
                     <SaveAltIcon/>     Download Now
            </MDTypography></CSVLink></MDButton>
                  </TableCell>
          
                </TableRow>
                 </TableHead>
                </Table >
            <Table >
              <TableHead sx={{ display: "table-header-group !important" }}>
                <TableRow>
                <TableCell
                    align="center"
                    // bgcolor="#E91E63"
                    minwidth= {150} 
                    rowSpan={2}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    align="center"
                    // bgcolor="#E91E63"
                    rowSpan={2}
                  >
                    Team
                  </TableCell>
                  <TableCell
                    align="center"
                    // width="2 rem"
                    // bgcolor="#E91E63"
                  //  sx={{width:"2 rem"}}
                    rowSpan={2}
                  >
                    Batch
                  </TableCell>
                  <TableCell
                    align="center"
                    // width="2 rem"
                    // bgcolor="#E91E63"
                  //  sx={{width:"2 rem"}}
                    rowSpan={2}
                  >
                   Projectname
                  </TableCell>
                  <TableCell align="center" bgcolor="#f3e5f5" colSpan={4}>
                    Count of Associates
                  </TableCell>
                  <TableCell align="center" bgcolor="#a7ffeb" colSpan={10}>
                    Total Project Status
                  </TableCell>
                  {/* <TableCell align="center" bgcolor="#ffe0b2" colSpan={4}>
                    Total jobs worked on
                  </TableCell> */}
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minwidth: column.minwidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {/* {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                        { value}
                        </TableCell>
                      );
                    })} */}
                        <TableCell>
                          {moment(item.reportDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>{item.team}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>{item.projectname}</TableCell>
                        <TableCell>{item.associated.annotation}</TableCell>
                        <TableCell>{item.associated.qc}</TableCell>
                        <TableCell>{item.associated.pm}</TableCell>
                        <TableCell>{item.associated.total}</TableCell>
                        <TableCell>{item.jobs?.managerTeam}</TableCell>
                        <TableCell>{item.jobs?.status1}</TableCell>
                        <TableCell>  {moment(item.jobs?.cDate).format("DD/MM/YYYY")}</TableCell>
                        {/* <TableCell>{item.hours.annotation}</TableCell>
                        <TableCell>{item.hours.qc}</TableCell>
                        <TableCell>{item.hours.pm}</TableCell>
                        <TableCell>{item.hours.training}</TableCell>
                        <TableCell>{item.hours.ojt}</TableCell>
                        <TableCell>{item.hours.qcFeedback}</TableCell>
                        <TableCell>{item.hours.idle}</TableCell>
                        <TableCell>{item.hours.other}</TableCell>
                        <TableCell>{item.hours.comments}</TableCell>
                        <TableCell>{item.hours.total}</TableCell>
                        <TableCell>{item.jobs.annotation}</TableCell>
                        <TableCell>{item.jobs.qc}</TableCell>
                        <TableCell>{item.jobs.total}</TableCell> */}

                         
                        <TableCell>
                          <Link to={"/project-entry/edit/" + item._id}>
                            <IconButton aria-label="edit">
                              <EditIcon />
                            </IconButton>{" "}
                          </Link>
                          |
                          <IconButton
                            onClick={(e) => handleDelete(item._id)}
                            color="error"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                          {/* <button onClick={e => handleDelete(index,e)}><DeleteForeverIcon/></button> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
             
            </Table>
          </TableContainer>
          <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </Grid>
      <Footer />
      <ToastContainer/>
    </DashboardLayout>
  );
}
