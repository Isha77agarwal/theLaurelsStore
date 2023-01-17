import { Box, AppBar, Toolbar, IconButton, Button, Tooltip, Popover } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import logo from '../assets/logo.ico'
import { Link } from 'react-router-dom'
import { categories } from '../data/data.js'
import Subcategory from './Subcategory'
import SearchBar from './SearchBar';

const MenuD = () => {
    const [currentId, setCurrent] = useState("")

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick1 = (event, category) => {
        setAnchorEl(event.currentTarget);
        setCurrent(category)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrent("")
    };

    const open = Boolean(anchorEl);
    const [openSearch, setOpenSearch] = React.useState(false);

    const handleClickOpen = () => {
        setOpenSearch(true);
    };

    const handleClose1 = () => {
        setOpenSearch(false);
    };

    return (
        <Box>
            {openSearch && <SearchBar open={openSearch} handleClose={handleClose1} width='md' />}
            <AppBar color="primary" elevation={0}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" color="inherit" sx={{ mr: 5 }} size="large">
                        <img src={logo} alt="LOGO" ></img>
                    </IconButton>

                    <Box>
                        {categories.map((category, index) => (
                            <span key={index} aria-describedby={category} onMouseEnter={(event) => handleClick1(event, category)}
                                onMouseOver={(event) => handleClick1(event, category)}
                                onMouseLeave={handleClose}
                                aria-owns={open ? { category } : undefined} >
                                <Button color="inherit" sx={{
                                    ':hover': {
                                        bgcolor: 'primary.dark',
                                        color: 'white',
                                    }
                                }}><Link to={`product/${category}`} style={{ color: 'inherit', textDecoration: 'none' }}>{category}</Link></Button>
                                {currentId === category && <Popover sx={{
                                    pointerEvents: 'none',
                                }}
                                    open={open} anchorEl={anchorEl} id={category} anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }} onClose={handleClose}
                                    PaperProps={{
                                        onMouseEnter: handleClick1,
                                        onMouseLeave: handleClose,
                                        sx: {
                                            pointerEvents: 'auto'
                                        }
                                    }}>
                                    <Subcategory category={category} />
                                </Popover>}
                            </span>
                        ))}
                        <Tooltip title="Search">
                            <IconButton color="inherit" size="large" aria-label="search" aria-haspopup="true" aria-controls="search" sx={{
                                ':hover': {
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                },
                            }} onClick={handleClickOpen}>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Login">
                            <IconButton color="inherit" size="large" aria-label="login" aria-haspopup="true" aria-controls="login" sx={{
                                ':hover': {
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                },
                            }}>
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cart">
                            <IconButton color="inherit" size="large" aria-label="cart" aria-controls="cart" sx={{
                                ':hover': {
                                    bgcolor: 'primary.dark',
                                    color: 'white',
                                },
                            }}>
                                <ShoppingBagOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default MenuD