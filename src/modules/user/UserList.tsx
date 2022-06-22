import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Modal, Button, Form } from "react-bootstrap";
import AgGridTable from '../../components/tables/AgGridTable';
import { userService } from "../../services/UserService";


interface UserData {
    id: number;
    name: string;
    timestamp: string;
}

interface UsersResult {
    users: Array<UserData>
}

interface UserDetails {
    id: string;
    name: string;
    timestamp: string;
}

interface AddUserResponse {
    returning: Array<UserDetails>;
}

interface UpdateUserDetails {
    id: string;
    name: string;
    timestamp: string;
}

interface UpdateUserResponse {
    returning: Array<UpdateUserDetails>;
}

interface DeleteUserDetails {
    id: string;
    name: string;
    timestamp: string;
}

interface DeleteUserResponse {
    returning: Array<DeleteUserDetails>;
}

const UserList = () => {

    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [updateName, setUpdateName] = useState('');
    const [gridApi, setGridApi] = useState<any>(null);
    const [show, setShow] = useState(false);

    const { loading, error, data } = useQuery<UsersResult>(userService.getUserList);

    const [addUser, { data: userData }] = useMutation<
        { insert_users: AddUserResponse }
    >(userService.createUser);

    const [updateUser, { data: updateUserData }] = useMutation<
        { update_users: UpdateUserResponse }
    >(userService.updateUser);

    const [deleteUser, { data: deleteUserData }] = useMutation<
        { delete_users: DeleteUserResponse }
    >(userService.deleteUser);

    /**
    * get user list 
    */
    const getTableData = async () => {
        if (gridApi) {
            const dataSource = {
                getRows: async (params: any) => {
                    if (data) {
                        params.successCallback(data.users, data.users.length);
                    }
                }
            }
            gridApi.setDatasource(dataSource);
        }
    }

    useEffect(() => {
        getTableData();
    }, [gridApi, data]);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleUpdateUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUpdateName(e.target.value);
    }


    async function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();
        await addUser({
            variables: { name },
            refetchQueries: [{ query: userService.getUserList }]
        });
        setName('');
    }

    const handleUpdateUserNameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateUserObj = PrepareUpdateObject(userId, updateName);
        await updateUser(updateUserObj);
        setShow(false);
        setUpdateName('');
        setUserId('');
    };

    const handleEditUserNameModalShow = () => {
        setShow(true);
    };

    const PrepareUpdateObject = (whereCondition: any, setCondition: any) => {
        return {
            variables: {
                where: {
                    id: {
                        "_eq": whereCondition
                    }
                }, set: { name: setCondition }
            },
            refetchQueries: [{ query: userService.getUserList }]
        }
    };

    const PrepareDeleteObject = (whereCondition: any) => {
        return {
            variables: {
                where: {
                    id: {
                        "_eq": whereCondition
                    }
                }
            },
            refetchQueries: [{ query: userService.getUserList }]
        }
    };

    const handleDeleteUserColumnSubmit = async (deleteUserId: any) => {
        const deleteUserObj = PrepareDeleteObject(deleteUserId)
        await deleteUser(deleteUserObj);
        setName('');
        setUpdateName('');
    };

    const handleClose = () => {
        setShow(false);
    };

    /* table columns field name */
    const columns = [
        {
            headerName: "Id", field: "id", width: 320,
            checkboxSelection: true, headerCheckboxSelection: true
        },
        { headerName: "Name", field: "name", width: 350 },
        {
            headerName: "Timestamp", field: "timestamp", width: 350,
            valueFormatter: (params: any) => {
                if (params.value !== undefined) {
                    return new Date(params.value).toLocaleString();
                }
                return "-";
            },
        },
        {
            headerName: "Action", width: 300,
            field: "id", sortable: false,
            cellRenderer: (params: any) => {
                if (params.value) {
                    return <>
                        <Button variant="primary" onClick={() => {
                            handleEditUserNameModalShow();
                            setUserId(params.value);
                            setUpdateName(params.data.name);
                        }} style={{ cursor: "pointer", marginRight: "20px" }}>Edit</Button>
                        <Button variant="danger"
                            onClick={() => handleDeleteUserColumnSubmit(params.value)}
                            style={{ cursor: "pointer" }}>Delete</Button>
                    </>
                }
            }
        }
    ]

    const onGridReady = (params: any) => {
        setGridApi(params.api);
    };

    return (
        <>
            {show &&
                (
                    <Modal
                        show={show}
                        backdrop="static">
                        <Modal.Header
                            closeButton
                            onClick={handleClose}
                        >
                            <Modal.Title>Update Name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleUpdateUserNameSubmit}>
                                <Form.Label controlId="edit_username">Name: </Form.Label>
                                <Form.Control required name="edit_username" type="text" onChange={handleUpdateUserNameChange} value={updateName} autoComplete="off" style={{ marginBottom: "10px" }} />
                                <Button type="submit" variant="secondary">Update</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                )}
            {/*      <h1>GraphQL Demo: Space X API</h1>
            --------------------------------------------------------------------------------- */}
            <div>
                <h2>Users</h2>
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor="username" style={{ marginRight: "10px" }}>Name: </label>
                    <input required name="username" type="text" style={{ marginRight: "15px" }} onChange={handleOnChange} value={name} autoComplete="off" />
                    <Button variant="secondary" type="submit">Add User</Button>
                </form>
            </div>
            <br />
            {/*  <AgGridTable
                recordPerPage={20}
                onGridReady={onGridReady}
                columns={columns}
                suppressRowClickSelection={true} /> */}
        </>
    );
}

export default UserList;