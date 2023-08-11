import React, { useState } from 'react';
import './Carte.css';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import data from '../data/CardsMock'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import card from '../card.png';


function Carte() {
    //valeur de slider
    const [value, setValue] = React.useState(10);
    const handleChangeValue = (event, newValue) => {
        if (typeof newValue === 'number') {
            setValue(newValue);
        }
    };
    console.log(value)

    //Selectionner l'objet de carte
    const [selectedOption, setSelectedOption] = useState("");
    //Selectionner le compte
    const [selectedAccount, setSelectedAccount] = useState("");
    const style = {
        width: '100%',
        maxWidth: 'auto',
        bgcolor: 'background.paper',
    };
    //style du modal
    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px  #000',
        boxShadow: 24,
        p: 4,
    };
    //open and close du modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setSelectedOption(e.target.value);

    }
    console.log(selectedOption)
    const handleChangeAccount = e => {
        setSelectedAccount(e.target.value);
    }

    console.log(data.data)

    //Methode pour modifier slider
    const updateCard = async (id) => {
        console.log(id)
        const updateCard = { id: id, cardLimit: value }
        data.data = data.data.map((card) => (card.id !== id ? card.cardLimit : value))
        console.log("hhhhh", data.data)
        handleClose()
        return updateCard

    }
    return (
        <>
            <div className='container' >
                <div>
                    <div className="item">
                        <h3 style={{ textAlign: 'left' }}>Mes cartes</h3></div>
                    <div style={{ float: 'right', padding: '20px' }} ><Button size="small" variant="contained" color="error" >
                        Ajouter une carte
                    </Button></div>
                </div>
                <br />
                <div>
                    <FormControl fullWidth >
                        <InputLabel >Type de carte</InputLabel>
                        <Select

                            value={selectedOption} // set selected value
                            options={data.data} // set list of the data
                            label="Type de carte"
                            onChange={handleChange}
                        >
                            {data.data.map((carte) => <MenuItem key={carte.id} value={carte}>{carte.type}</MenuItem>)}
                        </Select>

                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl fullWidth >
                        <InputLabel >Compte</InputLabel>
                        <Select

                            value={selectedAccount} // set selected value
                            //options={data.data} // set list of the data
                            label="Compte"
                            onChange={handleChangeAccount}
                        >
                            {data.data.map(carte => <MenuItem key={carte.id} value={carte.accountId}>{carte.accountId}</MenuItem>)}
                        </Select>

                    </FormControl>
                </div>
                <br />
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <h4>{selectedOption?.type}</h4>
                        <div style={{
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            backgroundRepeat: ' noRepeat', margin: 'auto', width: '400px', height: '250px', backgroundImage: `url(${card})`
                        }}>
                            <div style={{ color: 'white', margin: 'auto', padding: '60px' }}>

                                <h3 >{selectedOption?.cardNumber}</h3>
                                <br />
                                <label >{selectedOption?.accountName}</label>
                                <br />
                                <label>Date d'expiration</label>
                                <br />
                                <label>{selectedOption?.expiryDate}</label>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', textDecoration: 'underline', fontSize: "12px" }}>Code pin oublié?</div>
                        <div style={{ justifyContent: "center", display: "flex" }}>
                            <Switch defaultChecked color='success' />

                            <FormHelperText>carte active</FormHelperText>
                        </div>
                        <List sx={style} component="nav" aria-label="mailbox folders">
                            <ListItem >
                                <ListItemText primary="Statut" />
                                <span style={{ color: 'green' }}>{selectedOption?.status}</span>
                            </ListItem>
                            <Divider />
                            <ListItem divider>
                                <ListItemText primary="Date expiration" />
                                <span>{selectedOption?.expiryDate}</span>
                            </ListItem>
                            <ListItem >
                                <ListItemText primary="Plafond disponible" />
                                <span>{selectedOption?.cardAvailableLimit} TND</span>
                            </ListItem>
                            <Divider light />
                            <ListItem >
                                <ListItemText primary="Plafond hebdomadaire" />
                                <IconButton aria-label="delete" onClick={handleOpen}>
                                    <EditIcon style={{ color: 'red' }} />
                                </IconButton>
                                <span>{selectedOption?.cardLimit} TND</span>

                            </ListItem>
                        </List>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleModal}>
                                <Typography id="modal-modal-title" variant="h5" component="h5" style={{ textAlign: 'center' }}>
                                    Augmentation du plafond de la carte
                                </Typography>
                                <br />
                                <br />
                                <br />
                                <span>400</span>
                                <span style={{ float: 'right' }}>{selectedOption?.cardLimit}</span>
                                <Slider
                                    aria-label="Temperature"
                                    defaultValue={selectedOption?.cardAvailableLimit}
                                    valueLabelDisplay="auto"
                                    min={400}
                                    max={selectedOption?.cardLimit}
                                    color="error"
                                    //value={value}
                                    onChange={handleChangeValue}

                                />
                                <span>Min</span>
                                <span style={{ float: 'right' }}>Max</span>
                                <br />
                                <br />
                                <br />

                                <div style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}> <Button variant="contained" color="error"
                                    >
                                    Valider les modifications
                                </Button></div>


                            </Box>
                        </Modal>
                    </CardContent>

                </Card>
            </div>
        </>
    )
}

export default Carte