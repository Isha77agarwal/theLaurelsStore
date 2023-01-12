import React, { useState } from 'react'
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Drawer, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, Divider, ListItemText, Typography, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.ico'
import { categories, subcategories } from '../data/data.js'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';
import GoogleIcon from '@mui/icons-material/Google';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const MenuPhone = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [inputs, setInputs] = useState({
        id: '',
        password: ''
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickOpen = () => {
        setSearchOpen(!searchOpen)
    }

    const handleClose = () => {
        setSearchOpen(false);
    };

    const handleChangeInputs = e => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const drawerWidth = '240px'
    return (
        <Box>
            {searchOpen && <SearchBar open={searchOpen} handleClose={handleClose} width='xs' />}
            <CssBaseline />
            <AppBar color="primary" elevation={0}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" sx={{ mr: 5 }} size="large">
                        <img src={logo} alt="LOGO" ></img>
                    </IconButton>
                    <IconButton color="inherit" size="large" aria-label="search" aria-haspopup="true" aria-controls="search" onClick={handleClickOpen}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" size="large" aria-label="login" aria-haspopup="true" aria-controls="login">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit" size="large" aria-label="cart" aria-controls="cart">
                        <ShoppingBagOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="Phone Drawer">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    <AppBar position="static" elevation={0}>
                        <Tabs value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="menu-account" centered>
                            <Tab value={0} label='MENU' sx={{ fontSize: '18px', fontWeight: 500, width: '50%', color: '#fff' }} />
                            <Tab value={1} label='ACCOUNT' sx={{ fontSize: '18px', fontWeight: 500, width: '50%', color: '#fff' }} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {categories.map((category, index) => (
                            <Accordion key={index} elevation={0}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                    aria-controls={category}
                                    id={category}>
                                    <Link to={`product/${category}`} style={{ color: 'inherit', textDecoration: 'none' }}>{category}</Link>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <MenuList dense>
                                        {subcategories[category].map((subCategory, index) => (
                                            <Box key={index}>
                                                <MenuItem sx={{ margin: 0 }}><ListItemText><Link style={{
                                                    color: 'inherit', textDecoration: 'none'
                                                }} to={`product/${subCategory}`}>{subCategory}</Link></ListItemText></MenuItem>
                                                <Divider />
                                            </Box>
                                        ))}
                                    </MenuList>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Box component='form'>
                            <Typography color='primary' sx={{ fontWeight: 550, fontSize: '15px', marginBottom: '20px' }}>ALREADY A CUSTOMER?</Typography>

                            <TextField variant='standard' value={inputs.id} required label='Email' sx={{ marginBottom: '10px' }} name='id' onChange={handleChangeInputs} />
                            <TextField variant='standard' value={inputs.password} required label='Password' sx={{ marginBottom: '10px' }} name='password' onChange={handleChangeInputs} />
                            <Button color="secondary" variant="contained" sx={{ width: '100%', height: '100%', borderRadius: '20px', fontWeight: 600 }}>SIGN IN</Button>
                            <Divider sx={{ margin: '15px 0' }} />
                            <Button color='primary' variant='outlined' sx={{ width: '100%', height: '100%', borderRadius: '20px', fontWeight: 600, marginBottom: '15px', border: '2px solid' }}>SIGN IN WITH <GoogleIcon size='small' /></Button>
                        </Box>

                    </TabPanel>
                </Drawer>
            </Box>
        </Box>
    )
}

export default MenuPhone

