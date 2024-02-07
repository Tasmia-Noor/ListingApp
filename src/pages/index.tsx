import * as React from "react";
import { useState, useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
  Paper,
  alpha,
  useTheme,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  OutlinedInput,
  SvgIcon,
  InputAdornment,

} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from "@mui/material/Checkbox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

interface User {
  name: { first: string; last: string };
  email: string;
  gender: string;
  location: { city: string; state: string; country: string };
  registered: { date: string };
  dob: { age: number };
}

const ListingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [replicateUsers, setReplicateUsers] = useState<User[]>([]);
  const [currentPageUsers, setCurrentPageUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [gender, setGender] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState("");
  const LEADS_PER_PAGE: number = 25;
  const LEADS_TOTAL: number = users.length;
  const totalPageCount: number = Math.ceil(LEADS_TOTAL / LEADS_PER_PAGE);

  useEffect(() => {
    if (users.length === 100) return;
    (async () => {
      try {
        const responseData = await axios.get(`https://randomuser.me/api/?results=100`);

        const response: User[] = responseData.data.results;
        setUsers(response);
      } catch (err) {
        console.log(err, "error here");
      }
    })();
  }, []);

  useEffect(() => {
    const UsersPerPage = users.slice((page - 1) * LEADS_PER_PAGE, page * LEADS_PER_PAGE);
    setReplicateUsers(UsersPerPage)
    setCurrentPageUsers(UsersPerPage);
  }, [page, users]);

  useEffect(() => {
    console.log(gender, 'gender');
    if (gender === 'all') {
      setCurrentPageUsers(replicateUsers)
    }
    else {
      const filteredData = replicateUsers.filter((user) =>
        user.gender.toLowerCase() === gender
      );

      setCurrentPageUsers(filteredData)
    }
  }, [gender, page]);

  const handleRowClick = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate(`/profile/${user.email}`);
  };

  const handleSearch = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = currentPageUsers.filter((user) =>
      user.name.first.toLowerCase().includes(query) ||
      user.name.last.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
    console.log(filteredData, "filteredData");
    setCurrentPageUsers(filteredData);

    if (query === "") {
      setCurrentPageUsers(replicateUsers);
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4">Users</Typography>
          <Stack spacing={4}>
            <OutlinedInput
              // sx={{ Width: "20px" }}
              onChange={handleSearch}
              placeholder="Search contacts"
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              }
              value={searchQuery}
            />
          </Stack>
          <Stack spacing={4}>
            <TableContainer sx={{ mt: 0 }} component={Paper}>
              <Table sx={{ Width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-root": {
                        backgroundColor: "#FFFFFF",
                        borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      },
                    }}
                  >
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">FIRST NAME</TableCell>
                    <TableCell align="left">LAST NAME</TableCell>
                    <TableCell align="left">EMAIL</TableCell>
                    <TableCell align="left">LOCATION</TableCell>
                    <TableCell align="left">REGISTERED AT</TableCell>
                    <TableCell align="left">AGE</TableCell>
                    <TableCell align="left" style={{ width: '6vw' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{ fontSize: "15px", color: "black" }}>GENDER</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="gender"
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <MenuItem value={'male'}>Male</MenuItem>
                          <MenuItem value={'female'}>Female</MenuItem>
                          <MenuItem value={'all'}>All</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {currentPageUsers.map((user, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(user)}
                      style={{cursor:"pointer"}}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>{(page - 1) * LEADS_PER_PAGE + index + 1}</TableCell>
                      <TableCell align="left" sx={{ fontWeight: "500" }}>
                        {user.name.first}
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: "500" }}>
                        {user.name.last}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{`${user.location.city ?? ""}, ${user.location.state ?? ""
                        }, ${user.location.country ?? ""}`}</TableCell>
                      <TableCell align="left">{user.registered.date}</TableCell>
                      <TableCell align="left">{user.dob.age}</TableCell>
                      <TableCell align="left">{user.gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} p={3}>
              <Typography sx={{ fontWeight: "500" }}>
                Page {page} of {totalPageCount}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Button
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                  disabled={page === 1}
                  startIcon={<ChevronLeftIcon />}
                  variant="outlined"
                  sx={{ color: "#000000" }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (page < totalPageCount) {
                      setPage(page + 1);
                    }
                  }}
                  disabled={page === totalPageCount}
                  endIcon={<ChevronRightIcon />}
                  variant="outlined"
                  sx={{ color: "#000000" }}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ListingPage;