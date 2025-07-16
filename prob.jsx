import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, FormControl, InputLabel, Chip, Avatar,
    Grid, Card, CardContent, LinearProgress, IconButton, Tooltip, Box,
    Pagination, Switch, FormControlLabel, Snackbar, Alert
} from '@mui/material';
import {
    Delete, Edit, Visibility, CheckCircle, Cancel,
    Paid, MoneyOff, AdminPanelSettings, Person
} from '@mui/icons-material';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [pagination, setPagination] = useState({
        page: 1,
        rowsPerPage: 10,
        totalUsers: 0
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/alluser');
            setUsers(response.data.users);
            setPagination(prev => ({ ...prev, totalUsers: response.data.users.length }));
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to fetch users', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.patch(`/api/admin/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
            setSnackbar({ open: true, message: 'Role updated successfully', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to update role', severity: 'error' });
        }
    };

    const handleSubscriptionChange = async (userId, isPaidUser) => {
        try {
            await axios.patch(`/api/admin/users/${userId}/subscription`, { isPaidUser });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isPaidUser } : user
            ));
            setSnackbar({ open: true, message: 'Subscription updated', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to update subscription', severity: 'error' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="xl">
            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Users Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Subscription</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar sx={{ mr: 2 }}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        {user.name}
                                    </Box>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <FormControl size="small">
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
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={user.isPaidUser}
                                                onChange={(e) => handleSubscriptionChange(user._id, e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={user.isPaidUser ? 'Paid' : 'Free'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => {
                                        setSelectedUser(user);
                                        setOpenDialog(true);
                                    }}>
                                        <Visibility color="primary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* User Details Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">{selectedUser.name}</Typography>
                            </Grid>
                            {/* Add more user details here */}
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

// export default UserManagement;

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

    // Fetch users from API
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

    // Handle role change
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

    // Handle subscription change
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
                {/* ... rest of your component remains the same until the table ... */}

                {/* Users Table */}
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: blue[100] }}>
                                {/* ... other table headers ... */}
                                <TableCell>Role</TableCell>
                                <TableCell>Subscription</TableCell>
                                {/* ... other table headers ... */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedUsers.map((user) => (
                                <StyledTableRow key={user._id}>
                                    {/* ... other table cells ... */}
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
                                    {/* ... other table cells ... */}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* ... rest of your component remains the same ... */}
            </Container>
        </>
    );
};

export default UserManagementDashboard;