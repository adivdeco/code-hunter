// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Chip,
//     Avatar,
//     Grid,
//     Card,
//     CardContent,
//     LinearProgress,
//     IconButton,
//     Tooltip,
//     Box,
//     Pagination
// } from '@mui/material';
// import {
//     Delete as DeleteIcon,
//     Edit as EditIcon,
//     Visibility as VisibilityIcon,
//     CheckCircle as CheckCircleIcon,
//     Cancel as CancelIcon,
//     Paid as PaidIcon,
//     MoneyOff as MoneyOffIcon,
//     FilterList as FilterListIcon,
//     Sort as SortIcon,
//     Refresh as RefreshIcon
// } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';
// import { orange, green, red, blue, purple } from '@mui/material/colors';
// import axiosClient from '@/utils/axiosClint';
// import AdminNavbar from './AdminNav';
// import { useSelector } from 'react-redux';


// // Styled components
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     '&:hover': {
//         backgroundColor: theme.palette.action.selected,
//     },
// }));

// const StatusChip = styled(Chip)(({ theme, paid }) => ({
//     backgroundColor: paid ? green[100] : red[100],
//     color: paid ? green[800] : red[800],
//     fontWeight: 'bold',
// }));

// const UserManagementDashboard = () => {
//     // State management
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [deleteConfirm, setDeleteConfirm] = useState(false);
//     const [userToDelete, setUserToDelete] = useState(null);
//     const [filters, setFilters] = useState({
//         role: 'all',
//         status: 'all',
//         search: ''
//     });
//     const [sortConfig, setSortConfig] = useState({
//         key: 'name',
//         direction: 'asc'
//     });
//     const [pagination, setPagination] = useState({
//         page: 1,
//         rowsPerPage: 10,
//         totalUsers: 0
//     });

//     // Mock data fetch (replace with actual API calls)
//     // useEffect(() => {
//     //     const fetchUsers = async () => {
//     //         try {
//     //             // Replace with actual API call
//     //             const response = await fetch('/auth/alluser');
//     //             const data = await response.json();
//     //             console.log(data);

//     //             // Mock data based on your schema
//     //             // const mockUsers = [
//     //             //     {
//     //             //         _id: '1',
//     //             //         name: 'john_doe',
//     //             //         email: 'john@example.com',
//     //             //         role: 'user',
//     //             //         createdAt: '2023-05-15T10:00:00Z',
//     //             //         problemSolved: ['1', '2'],
//     //             //         isPaidUser: true
//     //             //     },
//     //             //     {
//     //             //         _id: '2',
//     //             //         name: 'jane_smith',
//     //             //         email: 'jane@example.com',
//     //             //         role: 'admin',
//     //             //         createdAt: '2023-04-20T08:30:00Z',
//     //             //         problemSolved: ['1', '3', '4'],
//     //             //         isPaidUser: false
//     //             //     },
//     //             //     {
//     //             //         _id: '3',
//     //             //         name: 'alex_wong',
//     //             //         email: 'alex@example.com',
//     //             //         role: 'user',
//     //             //         createdAt: '2023-06-01T15:45:00Z',
//     //             //         problemSolved: [],
//     //             //         isPaidUser: true
//     //             //     },
//     //             //     {
//     //             //         _id: '4',
//     //             //         name: 'sara_johnson',
//     //             //         email: 'sara@example.com',
//     //             //         role: 'user',
//     //             //         createdAt: '2023-03-10T12:20:00Z',
//     //             //         problemSolved: ['2', '3', '5'],
//     //             //         isPaidUser: false
//     //             //     },
//     //             //     {
//     //             //         _id: '5',
//     //             //         name: 'mike_chen',
//     //             //         email: 'mike@example.com',
//     //             //         role: 'user',
//     //             //         createdAt: '2023-07-05T09:15:00Z',
//     //             //         problemSolved: ['1'],
//     //             //         isPaidUser: true
//     //             //     },
//     //             // ];

//     //             setUsers(mockUsers);
//     //             setPagination(prev => ({ ...prev, totalUsers: mockUsers.length }));
//     //             setLoading(false);
//     //         } catch (error) {
//     //             console.error('Error fetching users:', error);
//     //             setLoading(false);
//     //         }
//     //     };

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true);
//             try {
//                 const response = await axiosClient.get('/auth/alluser');
//                 console.log(response.data);

//                 setUsers(response.data.alluser || []);
//                 setPagination(prev => ({ ...prev, totalUsers: (response.data.alluser || []).length }));
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, []);

//     // Filter and sort users
//     const filteredUsers = React.useMemo(() => {
//         let result = [...users];

//         // Apply filters
//         if (filters.role !== 'all') {
//             result = result.filter(user => user.role === filters.role);
//         }

//         if (filters.status !== 'all') {
//             result = result.filter(user =>
//                 filters.status === 'paid' ? user.isPaidUser : !user.isPaidUser
//             );
//         }

//         if (filters.search) {
//             const searchTerm = filters.search.toLowerCase();
//             result = result.filter(user =>
//                 user.name.toLowerCase().includes(searchTerm) ||
//                 user.email.toLowerCase().includes(searchTerm)
//             );
//         }

//         // Apply sorting
//         if (sortConfig.key) {
//             result.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === 'asc' ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === 'asc' ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }

//         // Update pagination total
//         setPagination(prev => ({ ...prev, totalUsers: result.length }));

//         return result;
//     }, [users, filters, sortConfig]);

//     // Pagination
//     const paginatedUsers = React.useMemo(() => {
//         const startIndex = (pagination.page - 1) * pagination.rowsPerPage;
//         return filteredUsers.slice(startIndex, startIndex + pagination.rowsPerPage);
//     }, [filteredUsers, pagination.page, pagination.rowsPerPage]);

//     // Handlers
//     const handleViewUser = (user) => {
//         setSelectedUser(user);
//         setOpenDialog(true);
//     };

//     const handleDeleteClick = (user) => {
//         setUserToDelete(user);
//         setDeleteConfirm(true);
//     };

//     const confirmDelete = async () => {
//         try {
//             await axiosClient.delete(`/auth/admin/users/${userToDelete._id}`);
//             setUsers(prev => prev.filter(user => user._id !== userToDelete._id));
//             setDeleteConfirm(false);
//             setUserToDelete(null);
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleSort = (key) => {
//         setSortConfig(prev => ({
//             key,
//             direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
//         }));
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({ ...prev, [name]: value }));
//         setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
//     };

//     const handlePageChange = (event, newPage) => {
//         setPagination(prev => ({ ...prev, page: newPage }));
//     };

//     const refreshData = () => {
//         setLoading(true);
//         // Simulate refresh
//         setTimeout(() => setLoading(false), 1000);
//     };
//     const { user } = useSelector((state) => state.auth);


//     return (

//         <>
//             <nav>
//                 <AdminNavbar user={user} />
//             </nav>
//             <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//                 <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: blue[800] }}>
//                     User Management Dashboard
//                 </Typography>

//                 {/* Stats Cards */}
//                 <Grid container spacing={3} sx={{ mb: 4 }}>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Card sx={{ bgcolor: blue[50], height: '100%' }}>
//                             <CardContent>
//                                 <Typography variant="h6" color="text.secondary">Total Users</Typography>
//                                 <Typography variant="h4">{users.length}</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Card sx={{ bgcolor: green[50], height: '100%' }}>
//                             <CardContent>
//                                 <Typography variant="h6" color="text.secondary">Active Users</Typography>
//                                 <Typography variant="h4">{users.filter(u => u.problemSolved.length > 0).length}</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Card sx={{ bgcolor: orange[50], height: '100%' }}>
//                             <CardContent>
//                                 <Typography variant="h6" color="text.secondary">Paid Users</Typography>
//                                 <Typography variant="h4">{users.filter(u => u.isPaidUser).length}</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={3}>
//                         <Card sx={{ bgcolor: purple[50], height: '100%' }}>
//                             <CardContent>
//                                 <Typography variant="h6" color="text.secondary">Admins</Typography>
//                                 <Typography variant="h4">{users.filter(u => u.role === 'admin').length}</Typography>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>

//                 {/* Filters and Actions */}
//                 <Paper sx={{ p: 2, mb: 3 }}>
//                     <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="Search Users"
//                                 variant="outlined"
//                                 size="small"
//                                 name="search"
//                                 value={filters.search}
//                                 onChange={handleFilterChange}
//                                 InputProps={{
//                                     startAdornment: <FilterListIcon color="action" sx={{ mr: 1 }} />
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={6} sm={3} md={2}>
//                             <FormControl fullWidth size="small">
//                                 <InputLabel>Role</InputLabel>
//                                 <Select
//                                     name="role"
//                                     value={filters.role}
//                                     label="Role"
//                                     onChange={handleFilterChange}
//                                 >
//                                     <MenuItem value="all">All Roles</MenuItem>
//                                     <MenuItem value="user">User</MenuItem>
//                                     <MenuItem value="admin">Admin</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={6} sm={3} md={2}>
//                             <FormControl fullWidth size="small">
//                                 <InputLabel>Status</InputLabel>
//                                 <Select
//                                     name="status"
//                                     value={filters.status}
//                                     label="Status"
//                                     onChange={handleFilterChange}
//                                 >
//                                     <MenuItem value="all">All Status</MenuItem>
//                                     <MenuItem value="paid">Paid</MenuItem>
//                                     <MenuItem value="free">Free</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 startIcon={<RefreshIcon />}
//                                 onClick={refreshData}
//                                 sx={{ mr: 2 }}
//                             >
//                                 Refresh
//                             </Button>
//                             <Button variant="outlined" color="primary">
//                                 Export Data
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Paper>

//                 {/* Loading indicator */}
//                 {loading && <LinearProgress sx={{ mb: 2 }} />}

//                 {/* Users Table */}
//                 <TableContainer component={Paper} sx={{ mb: 3 }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ bgcolor: blue[100] }}>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center">
//                                         User
//                                         <IconButton size="small" onClick={() => handleSort('name')}>
//                                             <SortIcon fontSize="inherit" />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center">
//                                         Role
//                                         <IconButton size="small" onClick={() => handleSort('role')}>
//                                             <SortIcon fontSize="inherit" />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>Status</TableCell>
//                                 <TableCell>
//                                     <Box display="flex" alignItems="center">
//                                         Problems Solved
//                                         <IconButton size="small" onClick={() => handleSort('problemSolved')}>
//                                             <SortIcon fontSize="inherit" />
//                                         </IconButton>
//                                     </Box>
//                                 </TableCell>
//                                 <TableCell>Joined</TableCell>
//                                 <TableCell align="center">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {paginatedUsers.map((user) => (
//                                 <StyledTableRow key={user._id}>
//                                     <TableCell>
//                                         <Box display="flex" alignItems="center">
//                                             <Avatar sx={{ bgcolor: blue[500], mr: 2, width: 32, height: 32 }}>
//                                                 {user.name.charAt(0).toUpperCase()}
//                                             </Avatar>
//                                             {user.name}
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell>{user.email}</TableCell>
//                                     <TableCell>
//                                         <Chip
//                                             label={user.role}
//                                             color={user.role === 'admin' ? 'primary' : 'default'}
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <StatusChip
//                                             label={user.isPaidUser ? 'Paid' : 'Free'}
//                                             paid={user.isPaidUser}
//                                             avatar={
//                                                 user.isPaidUser ?
//                                                     <PaidIcon style={{ color: green[800] }} className='language-icon' /> :
//                                                     <MoneyOffIcon style={{ color: red[800] }} className='language-icon' />
//                                             }
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//                                             <CheckCircleIcon color="success" sx={{ mr: 1 }} />
//                                             {user.problemSolved.length > 0 ? (
//                                                 user.problemSolved.map((problem, index) => (
//                                                     <Chip
//                                                         key={index}
//                                                         label={problem._id.toString().substring(0, 6)}
//                                                         size="small"
//                                                         variant="outlined"
//                                                     />
//                                                 ))
//                                             ) : (
//                                                 <Typography variant="body2" color="text.secondary">
//                                                     None
//                                                 </Typography>
//                                             )}
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell>
//                                         {new Date(user.createdAt).toLocaleDateString()}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Tooltip title="View Details">
//                                             <IconButton color="primary" onClick={() => handleViewUser(user)}>
//                                                 <VisibilityIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                         <Tooltip title="Delete User">
//                                             <IconButton color="error" onClick={() => handleDeleteClick(user)}>
//                                                 <DeleteIcon />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </TableCell>
//                                 </StyledTableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 {/* Pagination */}
//                 <Box display="flex" justifyContent="center" mb={4}>
//                     <Pagination
//                         count={Math.ceil(filteredUsers.length / pagination.rowsPerPage)}
//                         page={pagination.page}
//                         onChange={handlePageChange}
//                         color="primary"
//                         showFirstButton
//                         showLastButton
//                     />
//                 </Box>

//                 {/* User Details Dialog */}
//                 <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//                     <DialogTitle>
//                         User Details: {selectedUser?.name}
//                         <StatusChip
//                             label={selectedUser?.isPaidUser ? 'PAID USER' : 'FREE USER'}
//                             paid={selectedUser?.isPaidUser}
//                             sx={{ ml: 2 }}
//                         />
//                     </DialogTitle>
//                     <DialogContent dividers>
//                         {selectedUser && (
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                         Basic Information
//                                     </Typography>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Username:</Typography>
//                                         <Typography variant="body1">{selectedUser.name}</Typography>
//                                     </Box>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Email:</Typography>
//                                         <Typography variant="body1">{selectedUser.email}</Typography>
//                                     </Box>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Role:</Typography>
//                                         <Chip
//                                             label={selectedUser.role}
//                                             color={selectedUser.role === 'admin' ? 'primary' : 'default'}
//                                         />
//                                     </Box>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Joined:</Typography>
//                                         <Typography variant="body1">
//                                             {new Date(selectedUser.createdAt).toLocaleString()}
//                                         </Typography>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6}>
//                                     <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                         Activity
//                                     </Typography>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Problems Solved:</Typography>
//                                         <Typography variant="body1">{selectedUser.problemSolved.length}</Typography>
//                                         <LinearProgress
//                                             variant="determinate"
//                                             value={Math.min(selectedUser.problemSolved.length * 10, 100)}
//                                             sx={{ mt: 1, height: 8, borderRadius: 4 }}
//                                         />
//                                     </Box>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Last Active:</Typography>
//                                         <Typography variant="body1">
//                                             {new Date(selectedUser.createdAt).toLocaleString()} {/* Replace with actual last active */}
//                                         </Typography>
//                                     </Box>
//                                     <Box mb={2}>
//                                         <Typography variant="body2" color="text.secondary">Subscription:</Typography>
//                                         <Typography variant="body1">
//                                             {selectedUser.isPaidUser ? 'Premium Member' : 'Free Tier'}
//                                         </Typography>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
//                                         Problem Submission History
//                                     </Typography>
//                                     {selectedUser.problemSolved.length > 0 ? (
//                                         <TableContainer component={Paper} variant="outlined">
//                                             <Table size="small">
//                                                 <TableHead>
//                                                     <TableRow>
//                                                         <TableCell>Problem ID</TableCell>
//                                                         <TableCell>Solved At</TableCell>
//                                                     </TableRow>
//                                                 </TableHead>
//                                                 <TableBody>
//                                                     {selectedUser.problemSolved.map((problem, index) => (
//                                                         <TableRow key={index}>
//                                                             <TableCell>{problem._id.toString()}</TableCell>
//                                                             <TableCell>
//                                                                 {new Date(problem.solvedAt).toLocaleDateString()}
//                                                             </TableCell>
//                                                         </TableRow>
//                                                     ))}
//                                                 </TableBody>
//                                             </Table>
//                                         </TableContainer>
//                                     ) : (
//                                         <Typography variant="body2" color="text.secondary">
//                                             No problems solved yet.
//                                         </Typography>
//                                     )}
//                                 </Grid>
//                             </Grid>
//                         )}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setOpenDialog(false)} color="primary">
//                             Close
//                         </Button>
//                     </DialogActions>
//                 </Dialog>

//                 {/* Delete Confirmation Dialog */}
//                 <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
//                     <DialogTitle>Confirm Delete</DialogTitle>
//                     <DialogContent>
//                         <Typography>
//                             Are you sure you want to delete user <strong>{userToDelete?.name}</strong>?
//                             <br />
//                             This action cannot be undone and will delete all associated data.
//                         </Typography>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setDeleteConfirm(false)} color="primary">
//                             Cancel
//                         </Button>
//                         <Button onClick={confirmDelete} color="error" variant="contained" startIcon={<DeleteIcon />}>
//                             Delete User
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </Container >

//         </>
//     );
// };

// export default UserManagementDashboard;
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Avatar,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    IconButton,
    Tooltip,
    Box,
    Pagination,
    Switch,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    CheckCircle as CheckCircleIcon,
    Paid as PaidIcon,
    MoneyOff as MoneyOffIcon,
    FilterList as FilterListIcon,
    Sort as SortIcon,
    Refresh as RefreshIcon,
    AdminPanelSettings,
    Person
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { orange, green, red, blue, purple } from '@mui/material/colors';
import axiosClient from '@/utils/axiosClint';
import AdminNavbar from './AdminNav';
import { useSelector } from 'react-redux';

// Styled components
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const StatusChip = styled(Chip)(({ theme, paid }) => ({
    backgroundColor: paid ? green[100] : red[100],
    color: paid ? green[800] : red[800],
    fontWeight: 'bold',
}));

const UserManagementDashboard = () => {
    // State management
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [filters, setFilters] = useState({
        role: 'all',
        status: 'all',
        search: ''
    });
    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'asc'
    });
    const [pagination, setPagination] = useState({
        page: 1,
        rowsPerPage: 10,
        totalUsers: 0
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get('/auth/alluser');
                setUsers(response.data.alluser || []);
                setPagination(prev => ({ ...prev, totalUsers: (response.data.alluser || []).length }));
            } catch (error) {
                console.error('Error fetching users:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch users',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Role change handler
    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosClient.patch(`/auth/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
            setSnackbar({
                open: true,
                message: 'Role updated successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error updating role:', error);
            setSnackbar({
                open: true,
                message: 'Failed to update role',
                severity: 'error'
            });
        }
    };

    // Subscription change handler
    const handleSubscriptionChange = async (userId, isPaidUser) => {
        try {
            await axiosClient.patch(`/auth/admin/users/${userId}/subscription`, { isPaidUser });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isPaidUser } : user
            ));
            setSnackbar({
                open: true,
                message: 'Subscription updated successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error updating subscription:', error);
            setSnackbar({
                open: true,
                message: 'Failed to update subscription',
                severity: 'error'
            });
        }
    };

    // Filter and sort users
    const filteredUsers = React.useMemo(() => {
        let result = [...users];

        // Apply filters
        if (filters.role !== 'all') {
            result = result.filter(user => user.role === filters.role);
        }

        if (filters.status !== 'all') {
            result = result.filter(user =>
                filters.status === 'paid' ? user.isPaidUser : !user.isPaidUser
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            );
        }

        // Apply sorting
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        // Update pagination total
        setPagination(prev => ({ ...prev, totalUsers: result.length }));

        return result;
    }, [users, filters, sortConfig]);

    // Pagination
    const paginatedUsers = React.useMemo(() => {
        const startIndex = (pagination.page - 1) * pagination.rowsPerPage;
        return filteredUsers.slice(startIndex, startIndex + pagination.rowsPerPage);
    }, [filteredUsers, pagination.page, pagination.rowsPerPage]);

    // Handlers
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await axiosClient.delete(`/auth/admin/users/${userToDelete._id}`);
            setUsers(prev => prev.filter(user => user._id !== userToDelete._id));
            setDeleteConfirm(false);
            setUserToDelete(null);
            setSnackbar({
                open: true,
                message: 'User deleted successfully',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            setSnackbar({
                open: true,
                message: 'Failed to delete user',
                severity: 'error'
            });
        }
    };

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (event, newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const refreshData = () => {
        setLoading(true);
        // Simulate refresh
        setTimeout(() => setLoading(false), 1000);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <nav>
                <AdminNavbar user={user} />
            </nav>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: blue[800] }}>
                    User Management Dashboard
                </Typography>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: blue[50], height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">Total Users</Typography>
                                <Typography variant="h4">{users.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: green[50], height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">Active Users</Typography>
                                <Typography variant="h4">{users.filter(u => u.problemSolved.length > 0).length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: orange[50], height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">Paid Users</Typography>
                                <Typography variant="h4">{users.filter(u => u.isPaidUser).length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ bgcolor: purple[50], height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" color="text.secondary">Admins</Typography>
                                <Typography variant="h4">{users.filter(u => u.role === 'admin').length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Filters and Actions */}
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="Search Users"
                                variant="outlined"
                                size="small"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                InputProps={{
                                    startAdornment: <FilterListIcon color="action" sx={{ mr: 1 }} />
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={filters.role}
                                    label="Role"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="all">All Roles</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    name="status"
                                    value={filters.status}
                                    label="Status"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="all">All Status</MenuItem>
                                    <MenuItem value="paid">Paid</MenuItem>
                                    <MenuItem value="free">Free</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<RefreshIcon />}
                                onClick={refreshData}
                                sx={{ mr: 2 }}
                            >
                                Refresh
                            </Button>
                            <Button variant="outlined" color="primary">
                                Export Data
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Loading indicator */}
                {loading && <LinearProgress sx={{ mb: 2 }} />}

                {/* Users Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: blue[100] }}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        User
                                        <IconButton size="small" onClick={() => handleSort('name')}>
                                            <SortIcon fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        Role
                                        <IconButton size="small" onClick={() => handleSort('role')}>
                                            <SortIcon fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        Problems Solved
                                        <IconButton size="small" onClick={() => handleSort('problemSolved')}>
                                            <SortIcon fontSize="inherit" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>Joined</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <StyledTableRow key={user._id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar sx={{ bgcolor: blue[500], mr: 2, width: 32, height: 32 }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            {user.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <FormControl size="small" fullWidth>
                                            <Select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            >
                                                <MenuItem value="user">
                                                    <Box display="flex" alignItems="center">
                                                        <Person fontSize="small" sx={{ mr: 1 }} />
                                                        User
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="admin">
                                                    <Box display="flex" alignItems="center">
                                                        <AdminPanelSettings fontSize="small" sx={{ mr: 1 }} />
                                                        Admin
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Switch
                                                checked={user.isPaidUser || false}
                                                onChange={(e) => handleSubscriptionChange(user._id, e.target.checked)}
                                                color="primary"
                                            />
                                            <StatusChip
                                                label={user.isPaidUser ? 'Paid' : 'Free'}
                                                paid={user.isPaidUser}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                                            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                                            {user.problemSolved.length > 0 ? (
                                                user.problemSolved.map((problem, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={problem._id.toString().substring(0, 6)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    None
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View Details">
                                            <IconButton color="primary" onClick={() => handleViewUser(user)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete User">
                                            <IconButton color="error" onClick={() => handleDeleteClick(user)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination */}
                <Box display="flex" justifyContent="center" mb={4}>
                    <Pagination
                        count={Math.ceil(filteredUsers.length / pagination.rowsPerPage)}
                        page={pagination.page}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>

                {/* User Details Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                    <DialogTitle>
                        User Details: {selectedUser?.name}
                        <StatusChip
                            label={selectedUser?.isPaidUser ? 'PAID USER' : 'FREE USER'}
                            paid={selectedUser?.isPaidUser}
                            sx={{ ml: 2 }}
                        />
                    </DialogTitle>
                    <DialogContent dividers>
                        {selectedUser && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Basic Information
                                    </Typography>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Username:</Typography>
                                        <Typography variant="body1">{selectedUser.name}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Email:</Typography>
                                        <Typography variant="body1">{selectedUser.email}</Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Role:</Typography>
                                        <Chip
                                            label={selectedUser.role}
                                            color={selectedUser.role === 'admin' ? 'primary' : 'default'}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Joined:</Typography>
                                        <Typography variant="body1">
                                            {new Date(selectedUser.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Activity
                                    </Typography>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Problems Solved:</Typography>
                                        <Typography variant="body1">{selectedUser.problemSolved.length}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={Math.min(selectedUser.problemSolved.length * 10, 100)}
                                            sx={{ mt: 1, height: 8, borderRadius: 4 }}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Last Active:</Typography>
                                        <Typography variant="body1">
                                            {new Date(selectedUser.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Box mb={2}>
                                        <Typography variant="body2" color="text.secondary">Subscription:</Typography>
                                        <Typography variant="body1">
                                            {selectedUser.isPaidUser ? 'Premium Member' : 'Free Tier'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Problem Submission History
                                    </Typography>
                                    {selectedUser.problemSolved.length > 0 ? (
                                        <TableContainer component={Paper} variant="outlined">
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Problem ID</TableCell>
                                                        <TableCell>Solved At</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {selectedUser.problemSolved.map((problem, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{problem._id.toString()}</TableCell>
                                                            <TableCell>
                                                                {new Date(problem.solvedAt).toLocaleDateString()}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No problems solved yet.
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete user <strong>{userToDelete?.name}</strong>?
                            <br />
                            This action cannot be undone and will delete all associated data.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteConfirm(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="error" variant="contained" startIcon={<DeleteIcon />}>
                            Delete User
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default UserManagementDashboard;